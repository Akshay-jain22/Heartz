from backend import *

Status_Codes = ["Starting...", "Converting Audio...", "Transcribing Audio...", "Correcting Grammar...", "Finding Keywords...",
                "Generating Hyperlinks...", "Translating Text...", "Creating Summary...", "Writing PDF...", "Mailing PDF...", "Completed", "Something went wrong"]


def getStatusCode(Session_ID):
    Status_Index = getSession_FieldValue(Session_ID, "Session_Status_Index")
    if Status_Index == None:
        return "Session Expired"
    return Status_Codes[getSession_FieldValue(Session_ID, "Session_Status_Index")]


def createTextBatches(text):
    Text_Array = []
    i = 0
    batch_len = 300
    text_len = len(text)
    while i < text_len:
        if i + batch_len < text_len:
            last_i = i + batch_len
        else:
            Text_Array.append(text[i:])
            break
        while text[last_i] != ' ':
            last_i -= 1
        Text_Array.append(text[i:last_i])
        i = last_i + 1

    return Text_Array


def writeToFile(Session_ID, Text, Folder=Transcription_Dir):
    File_Path = Folder + Session_ID + ".txt"
    with open(File_Path, 'w') as f:
        f.write(Text)
    return File_Path


def Driver(Session_ID, translate_language, chk_hyperlink, chk_summary, chk_multiple_speaker):
    try:
        if chk_multiple_speaker:
            updateSession_FieldValue(Session_ID, "Session_Status_Index", 1)
            convertToAudio(Session_ID)
            origText, text, Summary, Keywords, confidence = runAssemblyAPI(
                Session_ID, bool(chk_hyperlink), bool(chk_summary))
            updateSession_FieldValue(Session_ID, "Confidence", str(confidence))

            # print(Keywords)
            textPath = writeToFile(Session_ID, origText, Download_Dir)
            url = uploadToGDrive(textPath, Session_ID + '.txt')
            print(url)

            KeywordMap = {}
            if chk_hyperlink:
                updateSession_FieldValue(Session_ID, "Session_Status_Index", 5)
                KeywordMap = getLinkMap(Keywords)

        else:
            updateSession_FieldValue(Session_ID, "Session_Status_Index", 2)
            text, confidence = get_audio_transcription(Session_ID)
            updateSession_FieldValue(Session_ID, "Confidence", str(confidence))
            # print("Text: ", text)
            print("Confidence: ", confidence)

            Text_Array = createTextBatches(text)

            updateSession_FieldValue(Session_ID, "Session_Status_Index", 3)
            text = ''
            for i in range(len(Text_Array)):
                text += GrammarCorrection(Text_Array[i]) + ' '
            textPath = writeToFile(Session_ID, text, Download_Dir)
            url = uploadToGDrive(textPath, Session_ID + '.txt')
            print(url)
            # print("Text: ", text)

            KeywordMap = {}
            if chk_hyperlink:
                updateSession_FieldValue(Session_ID, "Session_Status_Index", 4)
                KeywordMap = getKeywordMap(Text_Array)

            Summary = ''
            if chk_summary:
                updateSession_FieldValue(Session_ID, "Session_Status_Index", 7)
                Summary = summarize(text)

        Translated_Text = ''
        if translate_language != 'english':
            Text_Array = createTextBatches(text)
            updateSession_FieldValue(Session_ID, "Session_Status_Index", 6)
            for t in Text_Array:
                Translated_Text += translateText(t, translate_language) + ' '

        updateSession_FieldValue(Session_ID, "Session_Status_Index", 8)
        Write_PDF(Session_ID, text, KeywordMap, Summary, Translated_Text)
        uploadToGDrive(Transcription_Dir + Session_ID +
                       '.pdf', Session_ID + '.pdf')

        Send_Email(Session_ID)

        updateSession_FieldValue(Session_ID, "Session_Status_Index", 10)
        return True

    except Exception as e:
        print("main: ", e)
        updateSession_FieldValue(Session_ID, "Session_Status_Index", -1)
