from backend import Upload_Dir, getSession_FieldValue, updateSession_FieldValue
from pydub import AudioSegment
import os


def convertToAudio(Session_ID):
    File_Name = getSession_FieldValue(Session_ID, "File_Name")
    Extension = File_Name.split(".")[-1]
    if Extension == 'wav':
        return

    File_Path = Upload_Dir + File_Name
    Audio_File_Name = Session_ID + ".wav"
    Audio_File_Path = Upload_Dir + Audio_File_Name

    AudioSegment.from_file(File_Path).export(Audio_File_Path, format="wav")
    os.remove(File_Path)

    updateSession_FieldValue(Session_ID, "File_Name", Audio_File_Name)
