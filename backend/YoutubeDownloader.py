# Download Youtube Videos in Wav format inside a folder
from backend import Upload_Dir
import youtube_dl


def Download_Youtube_Video(Session_ID, youtube_video_url, Folder=Upload_Dir):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl': Folder + Session_ID + '.wav',
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([youtube_video_url])

    return Session_ID + '.wav'
