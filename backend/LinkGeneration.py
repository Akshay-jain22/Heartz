from urllib.error import HTTPError
from googlesearch import search
import time
import random


def getBestUrl(Query, rec_count=0):
    try:
        URLs = [str(j) for j in search(Query)]
    except HTTPError as e:
        print("getBestUrl :", e)
        time.sleep(random.uniform(0.5, 1.5))
        if rec_count < 3:
            return getBestUrl(Query, rec_count+1)
        else:
            return 'https://www.google.com/search?q='+Query

    for URL in URLs:
        if "wikipedia" in URL.lower():
            return URL
    return URLs[0]


def getLinkMap(Important_Words):
    Link_Map = {}
    for Word in Important_Words:
        try:
            Link_Map[Word.lower()] = getBestUrl(Word)
            # print(Word, Link_Map[Word])
        except Exception as e:
            print(e)
            time.sleep(1)
            continue

    # print(Link_Map)
    return Link_Map
