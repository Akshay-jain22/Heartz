from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import ssl

from backend import getSession_FieldValue, Sender_Email, Sender_Password, getGDriveLink, updateSession_FieldValue


# Ignore
def Send_Email(Session_ID):
    Status_Index = getSession_FieldValue(Session_ID, "Session_Status_Index")
    Receiver_Mail = getSession_FieldValue(Session_ID, "Email_Address")

    if Receiver_Mail == None:
        return

    updateSession_FieldValue(Session_ID, "Session_Status_Index", 9)

    Message = MIMEMultipart("alternative")
    Message["From"] = Sender_Email
    Message["To"] = Receiver_Mail

    # Notes Transcription Done
    if Status_Index == 1:
        Link = getGDriveLink(Session_ID + '.pdf')
        Message["Subject"] = "Heartz | Notes Created"
    # Notes Transcription Failed
    else:
        Message["Subject"] = "Heartz | Notes Creation Failed"


def main_email(flag, uid, link):
    sender_email = "vedikagadiap@gmail.com"
    receiver_email = "satyajeetk.191ee245@gmail.com"
    password = "zjcdnrscmejlcqjf"

    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender_email
    message["To"] = receiver_email

    if(flag == False):
        html = """\
    <html>
      <body>
        <p>Hi,<br>
          There was some error in the conversion of your audio file, we request you to enter the following user id at the portal to try again. <br>
          Your audio file is still with us, so no need to re upload! <br>
          <br><h3>{uid}</h3>
        </p>
      </body>
    </html>
    """.format(**locals())
    else:
        html = """\
    <html>
      <body>
        <p>Hi,<br>
          Your notes is ready to be downloaded, please download it by clicking on the following link!
          <br><br><a href={link}>
          <input type = "button" value = "Download notes" style = "display: inline-block;
          background-color: #4298f5;
          border-radius: 2px;
          border: 1px double #cccccc;
          color: #eeeeee;
          text-align: center;
          font-size: 16px;
          padding: 8px;
          width: 200px;
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -o-transition: all 0.5s;
          transition: all 0.5s;
          cursor: pointer;
          margin: 5px; "/>
          </a> 
        </p>
      </body>
    </html>
    """.format(**locals())
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part2)
    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )


if False:
    uid = input("enter user id: ")
    flag = input("did the transaction complete: [Y/N] ") == ("Y" or "y")
    link = input("enter a link: ")
    main_email(flag, uid, link)
