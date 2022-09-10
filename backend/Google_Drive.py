from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

from backend import GoogleDrive_FolderID, Download_Dir

gauth = GoogleAuth()
drive = GoogleDrive(gauth)

def uploadToGDrive(file_path, file_name):
    gfile = drive.CreateFile(
        {'parents': [{'id': GoogleDrive_FolderID}], 'title': file_name})
    gfile.SetContentFile(file_path)
    gfile.Upload()
    return getGDriveLink(file_name)


def getGDriveLink(file_name):
    file_list = drive.ListFile(
        {'q': f"'{GoogleDrive_FolderID}' in parents and trashed=false and title='{file_name}'"}).GetList()
    return file_list[0]['alternateLink']


def downloadFromGDrive(file_name, file_type):
    file_list = drive.ListFile(
        {'q': f"'{GoogleDrive_FolderID}' in parents and trashed=false and title='{file_name}'"}).GetList()
    print(file_list)
    if file_type == 'pdf':
        file_list[0].GetContentFile(
            Download_Dir + file_name, mimetype='application/pdf')
    elif file_type == 'txt':
        file_list[0].GetContentFile(
            Download_Dir + file_name, mimetype='text/plain')
    return Download_Dir + file_name


if False:
    print(downloadFromGDrive('transcript.pdf', 'pdf'))
