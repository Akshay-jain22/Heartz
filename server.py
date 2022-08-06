from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_restful import Api
import googletrans
import os

app = Flask(__name__)
CORS(app)  # comment this on deployment
api = Api(app)


@app.route('/uploadfile', methods=['GET', 'POST'])
def uploadfile():
    if not os.path.isdir('./Temp'):
        os.mkdir('./Temp/')
    if request.method == 'POST':
        if 'file' in request.files:
            f = request.files['file']
            filePath = "./Temp/" + f.filename
            f.save(filePath)
            return "success"
        else:
            print(request.files)
            return "fail"


@app.route('/transcript', methods=['GET', 'POST'])
def transcript():
    return "success"


@app.route('/getLanguages', methods=['GET', 'POST'])
def getLanguages():
    if request.method == 'GET':
        languages = list(googletrans.LANGUAGES.values())
        return ','.join(languages)


@app.route('/getTranscript', methods=['GET', 'POST'])
def getTranscript():
    if request.method == 'GET':
        # if not os.path.isdir('./Temp'):
        #     return "Some Transcription Error Occured"
        return send_from_directory('./Temp', 'transcript1.pdf', as_attachment=True)


@app.route('/getModel', methods=['GET', 'POST'])
def getModel():
    if request.method == 'GET':
        return send_from_directory('./Temp', 'Model.h5', as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
