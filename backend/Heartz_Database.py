import sqlite3
from backend import Database_Path


def createTable():
    conn = sqlite3.connect(Database_Path)
    conn.execute('''CREATE TABLE IF NOT EXISTS Session_Info (Session_ID TEXT PRIMARY KEY NOT NULL, IP_Address TEXT NOT NULL, Session_Status_Index INT NOT NULL, Email_Address TEXT NULL, File_Name TEXT NULL, Confidence FLOAT NULL, Translate_Language TEXT NULL, Chk_Hyperlink INT NULL, Chk_Summary INT NULL, Chk_Multiple_Speaker INT NULL)''')
    conn.close()


# Creating Session_Info Table if not exists
createTable()


def createNewSession(Session_ID, IP_Address):
    conn = sqlite3.connect(Database_Path)
    conn.execute("INSERT INTO Session_Info (Session_ID, IP_Address, Session_Status_Index) VALUES (?, ?, ?)",
                 (Session_ID, IP_Address, 0))
    conn.commit()
    conn.close()


def updateSession_FieldValue(Session_ID, Field, Value):
    conn = sqlite3.connect(Database_Path)
    conn.execute("UPDATE Session_Info SET " + Field +
                 " = ? WHERE Session_ID = ?", (Value, Session_ID))
    conn.commit()
    conn.close()


def getSession_FieldValue(Session_ID, Field):
    conn = sqlite3.connect(Database_Path)
    cursor = conn.execute(
        "SELECT " + Field + " FROM Session_Info WHERE Session_ID = ?", (Session_ID,))
    for row in cursor:
        return row[0]
    conn.close()


def printTable(Table_Name="Session_Info"):
    conn = sqlite3.connect(Database_Path)
    cursor = conn.execute("SELECT * FROM " + Table_Name)
    for row in cursor:
        print(row)
    conn.close()
