import requests
from backend import AssemblyAI_APIKEY, getSession_FieldValue, updateSession_FieldValue
import time
from env import Upload_Dir
from mutagen.wave import WAVE


def read_file(filename, chunk_size=5242880):
    print("Reading Started ...")
    with open(filename, 'rb') as _file:
        while True:
            try:
                chunk = _file.read(chunk_size)
                if not chunk:
                    break
                yield chunk
            except Exception as e:
                print(e)
    print("Reading Stopped ...")


def text_with_speakers(filename, chk_hyperlink, chk_summary, api_id=AssemblyAI_APIKEY):
    headers = {'authorization': api_id}
    response = requests.post('https://api.assemblyai.com/v2/upload',
                             headers=headers,
                             data=read_file(filename))

    url = response.json()['upload_url']

    endpoint = "https://api.assemblyai.com/v2/transcript"
    json = {
        "audio_url": url,
        "speaker_labels": True,
        "auto_chapters": chk_summary,
        "auto_highlights": chk_hyperlink,
    }
    headers = {
        "authorization": api_id,
        "content-type": "application/json"
    }
    response = requests.post(endpoint, json=json, headers=headers)
    # print(response)
    return response.json()["id"]


def getResponse(id, api_id=AssemblyAI_APIKEY):
    endpoint = "https://api.assemblyai.com/v2/transcript/" + id
    headers = {"authorization": api_id}
    response = requests.get(endpoint, headers=headers, timeout=10)
    return response.json()


def wait_for_completion(id):
    while True:
        response = getResponse(id)
        if response['status'] == 'completed':
            return response

        time.sleep(5)


def runAssemblyAPI(Session_ID, chk_hyperlink, chk_summary):
    File_Name = getSession_FieldValue(Session_ID, "File_Name")
    File_Path = Upload_Dir + File_Name
    id = text_with_speakers(File_Path, chk_hyperlink, chk_summary)
    print(id)

    # Audio File length in seconds
    audio_length = WAVE(File_Path).info.length
    time.sleep(audio_length/5)
    wait_for_completion(id)

    response = getResponse(id)
    words = response['words']
    summary = response['chapters']
    keywords = response['auto_highlights_result']
    confidence = response['confidence']
    # print(response)
    updateSession_FieldValue(Session_ID, "Session_Status_Index", 2)
    last_speaker, Text = 'Speaker ' + words[0]['speaker'], ''
    Speaker_Rec = ''
    Total_Text = ''
    for word in words:
        if 'Speaker ' + word['speaker'] == last_speaker:
            Text += word['text'] + ' '
        else:
            Speaker_Rec += last_speaker + " : " + Text + '\n'
            Total_Text += Text + ' '
            Text = word['text'] + ' '
            last_speaker = 'Speaker ' + word['speaker']
    Speaker_Rec += last_speaker + " : " + Text + '\n'
    Total_Text += Text + ' '

    Summary = ''
    if chk_summary:
        updateSession_FieldValue(Session_ID, "Session_Status_Index", 7)
        Summary = ' '.join([i["summary"] for i in summary])

    Keywords = []
    # print(keywords)
    if chk_hyperlink:
        updateSession_FieldValue(Session_ID, "Session_Status_Index", 4)
        Keywords = [i["text"] for i in keywords["results"]]

    # print(Speaker_Rec, Summary, Keywords, confidence)
    return Total_Text, Speaker_Rec, Summary, Keywords, confidence*100
