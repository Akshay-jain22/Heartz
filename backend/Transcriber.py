import speech_recognition as sr
import os
from pydub import AudioSegment

from backend import AudioChunks_Dir, getSession_FieldValue, Upload_Dir

r = sr.Recognizer()
if not os.path.isdir(AudioChunks_Dir):
    os.mkdir(AudioChunks_Dir)


def get_audio_transcription(Session_ID):
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    Audio_File_Name = getSession_FieldValue(Session_ID, "File_Name")
    Audio_File_Path = Upload_Dir + Audio_File_Name
    # Session_ID = 0

    sound = AudioSegment.from_file(Audio_File_Path)
    chunk_size, sound_size = 59000, len(sound)
    chunks = [sound[i:i+chunk_size] for i in range(0, sound_size, chunk_size)]

    whole_text = ""
    Overall_Confidence = Count = 0

    # process each chunk
    for i, audio_chunk in enumerate(chunks, start=1):
        chunk_filename = os.path.join(AudioChunks_Dir, f"{Session_ID}_{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")

        # recognize the chunk
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            r.adjust_for_ambient_noise(source, duration=0.5)
            try:
                Rec = r.recognize_google(audio_listened, show_all=True)
                text = Rec["alternative"][0]["transcript"]
                Overall_Confidence += Rec["alternative"][0]["confidence"]
                Count += 1
            except:
                pass
            else:
                text = f"{text.capitalize()}. "
                # print(chunk_filename, ":", text)
                whole_text += text + ' '

        # delete the chunk
        os.remove(chunk_filename)

    Overall_Confidence /= Count
    # print(Overall_Confidence)
    return whole_text, Overall_Confidence*100


if False:
    Audio_Path = "../Temp/Audio_1.mp3"
    if os.path.isfile(Audio_Path):
        print(get_audio_transcription(Audio_Path))
