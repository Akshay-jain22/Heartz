from flask import Flask, request, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restful import Api
import os
import uuid
import threading

# Custom Imports
from backend import *
from backend.main import *

app = Flask(__name__)
CORS(app, resources={"*": {"origins": "*"}})  # comment this on deployment
api = Api(app)


def startSession(IP_Address):
    Session_ID = str(uuid.uuid4()) + IP_Address
    createNewSession(Session_ID, IP_Address)
    return Session_ID


@app.route('/uploadfile', methods=['GET', 'POST'])
def uploadfile():
    if not os.path.isdir(Upload_Dir):
        os.mkdir(Upload_Dir)

    if request.method == 'POST':
        try:
            IP_Address = request.remote_addr
            Session_ID = startSession(IP_Address)
            print("Session Initiated :", Session_ID)

            if 'file' in request.files:
                file = request.files['file']
                extension = os.path.splitext(file.filename)[1]
                File_Name = Session_ID + extension
                file.save(os.path.join(Upload_Dir, File_Name))
            elif 'url' in request.form:
                youtube_video_url = request.form['url']
                File_Name = Download_Youtube_Video(
                    Session_ID, youtube_video_url)

            # Update Database
            updateSession_FieldValue(Session_ID, "Session_Status_Index", 1)
            updateSession_FieldValue(Session_ID, "File_Name", File_Name)

            return {"Session_ID": Session_ID}
        except Exception as e:
            print(e)
            print(request.files)
            return {"Error": "Some Error Occured while uploading file"}


def reassign_vars(var):
    if type(var) == bool:
        return int(var)
    else:
        return int(var == 'on')


@app.route('/transcript', methods=['GET', 'POST'])
def transcript():
    if request.method == 'POST':
        try:
            data = request.get_json()
            Session_ID = data["Session_ID"]
            translate_language = data["translate_language"]
            chk_hyperlink = reassign_vars(data["chk_hyperlink"])
            chk_summary = reassign_vars(data["chk_summary"])
            chk_multiple_speaker = reassign_vars(data["chk_multiple_speaker"])

            # Update Database
            updateSession_FieldValue(
                Session_ID, "Translate_Language", translate_language)
            updateSession_FieldValue(
                Session_ID, "chk_Hyperlink", chk_hyperlink)
            updateSession_FieldValue(Session_ID, "chk_Summary", chk_summary)
            updateSession_FieldValue(
                Session_ID, "chk_Multiple_Speaker", chk_multiple_speaker)

            if "email" in data:
                updateSession_FieldValue(
                    Session_ID, "Email_Address", data["email"])

            thread = threading.Thread(target=Driver, args=[Session_ID, translate_language,
                                                           chk_hyperlink, chk_summary, chk_multiple_speaker])
            thread.start()

            return "Transcription Started"
        except Exception as e:
            print(e)
            return "Some Error Occured"


@app.route('/getLanguages', methods=['GET', 'POST'])
def get_Languages():
    if request.method == 'GET':
        return {"languages": getLanguages()}


@app.route('/getTranscript', methods=['GET', 'POST'])
def getTranscript():
    if request.method == 'POST':
        try:
            data = request.get_json()
            Session_ID = data["Session_ID"]
            return {"Link": getGDriveLink(Session_ID + '.pdf'), "Confidence": getSession_FieldValue(Session_ID, "Confidence")}
        except Exception as e:
            return {"Error": str(e)}


@app.route('/getModel', methods=['GET', 'POST'])
def getModel():
    if request.method == 'GET':
        return send_from_directory('./Temp', 'Model.h5', as_attachment=True)


@app.route('/rerun', methods=['GET', 'POST'])
def rerun():
    if request.method == 'POST':
        data = request.get_json()
        Session_ID = data["Session_ID"]

        translate_language = getSession_FieldValue(
            Session_ID, "Translate_Language")
        Chk_Hyperlink = getSession_FieldValue(Session_ID, "Chk_Hyperlink")
        Chk_Summary = getSession_FieldValue(Session_ID, "Chk_Summary")
        Chk_Multiple_Speaker = getSession_FieldValue(
            Session_ID, "Chk_Multiple_Speaker")

        thread = threading.Thread(target=Driver, args=[
                                  Session_ID, translate_language, Chk_Hyperlink, Chk_Summary, Chk_Multiple_Speaker])
        thread.start()

        return "Started"


@app.route('/getStatus', methods=['GET', 'POST'])
@cross_origin()
def get_Status():
    if request.method == 'POST':
        try:
            data = request.get_json()
            Session_ID = data['Session_ID']
            return {"Status": getStatusCode(Session_ID)}
        except Exception as e:
            print("Error", e)
            return {"Error": "File Not Found"}


@app.route('/getAccuracy', methods=['GET', 'POST'])
def get_Accuracy():
    if request.method == 'POST':
        try:
            # data = request.get_json()
            Session_ID = request.form['Session_ID']
            transcriptFile = request.files['transcriptFile']
            transcriptFile.save(os.path.join(Download_Dir, Session_ID + '_2.txt'))
            return {"accuracies": getAccuracy(Session_ID, Session_ID + '_2.txt')}
        except Exception as e:
            print("Error", e)
            return {"Error": str(e)}


if __name__ == "__main__":
    app.run(debug=True)
