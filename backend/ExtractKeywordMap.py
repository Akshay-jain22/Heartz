from monkeylearn import MonkeyLearn
from backend import getBestUrl, MonkeyLearn_APIKEY as API_KEY

KeyWord_Extractor_Model_ID = 'ex_YCya9nrn'
ML = MonkeyLearn(API_KEY)


def getKeywordMap(Text_Array):
    Response = ML.extractors.extract(KeyWord_Extractor_Model_ID, Text_Array)

    Keyword_Map = {}
    for i in range(len(Text_Array)):
        Extractions = Response.body[i]["extractions"]
        for Extraction in Extractions:
            Important_Word = Extraction["parsed_value"]
            if Important_Word not in Keyword_Map:
                Keyword_Map[Important_Word.lower()] = getBestUrl(
                    Important_Word)

    # print(Keyword_Map)
    return Keyword_Map
