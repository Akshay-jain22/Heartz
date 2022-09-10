# Importing required libraries
from fpdf import FPDF
import re
from backend import Transcription_Dir


def writeInPdf(pdf, Transcript, KeywordMap):
    Keyword_Indices = []
    for Keyword in KeywordMap:
        for iter in list(re.finditer(Keyword.lower(), Transcript.lower())):
            Keyword_Indices.append((iter.start(), iter.end()))
    Keyword_Indices.sort()

    Cur_Index = Cur_Keyword_Index = 0
    while(Cur_Keyword_Index < len(Keyword_Indices)):
        Keyword_start, Keyword_end = Keyword_Indices[Cur_Keyword_Index]

        if Cur_Index < Keyword_start:
            pdf.set_text_color(0, 0, 0)
            pdf.write(5, Transcript[Cur_Index:Keyword_start])

        if Cur_Index < Keyword_end:
            pdf.set_text_color(0, 0, 255)
            pdf.write(5, Transcript[Keyword_start:Keyword_end],
                      link=KeywordMap[Transcript[Keyword_start:Keyword_end].lower()])
            Cur_Index = Keyword_end
        Cur_Keyword_Index += 1

    if Cur_Index < len(Transcript):
        pdf.set_text_color(0, 0, 0)
        pdf.write(5, Transcript[Cur_Index:])

    return pdf


def Write_PDF(Session_ID, Transcript, KeywordMap, Summary, Translated_Text):
    # PDF Object
    print("Writing Started")
    pdf = FPDF()

    # Transcript
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Notes", ln=1, align='C')
    pdf.set_font("Arial", size=12)
    pdf = writeInPdf(pdf, Transcript, KeywordMap)

    # Summary
    if Summary != '':
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="Summary", ln=1, align='C')
        pdf.set_font("Arial", size=12)
        pdf = writeInPdf(pdf, Summary, KeywordMap)

    # Translated Text
    if Translated_Text != '':
        pdf.add_font('DejaVu', '', 'Fonts/DejaVuSansCondensed.ttf', uni=True)
        pdf.add_font('gargi', '', 'Fonts/gargi.ttf', uni=True)
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="Translated Text", ln=1, align='C')
        pdf.set_font("gargi", size=12)
        pdf = writeInPdf(pdf, Translated_Text, KeywordMap)

    pdf.output(Transcription_Dir + Session_ID + ".pdf")

    print("Writing Completed")


# given transcript
transcript = "hotel I have to say that this hotel has the worst customer support ever. It is a shame that people in management positions hello"

summary = 'hotel is worst customer support ever shame in management positions hello'

LinkMap = {'worst customer support': 'https://www.helpscout.com/blog/bad-customer-service-stories/', 'bad attitude': 'https://en.wikipedia.org/wiki/Bad_Attitude',
           'management position': 'https://www.rasmussen.edu/degrees/business/blog/top-management-positions-future-business-leaders/', 'customer': 'https://en.wikipedia.org/wiki/Customer'}

if False:
    Write_PDF("Session_1", transcript, LinkMap, summary, summary)
