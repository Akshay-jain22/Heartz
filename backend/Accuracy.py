import nltk
from sklearn.metrics import jaccard_score
import string
import math
from sklearn.feature_extraction.text import TfidfVectorizer
import sys
import spacy  # pip install spacy
import warnings
import os
from backend import downloadFromGDrive, Download_Dir

warnings.filterwarnings("ignore")
nltk.download('punkt')


def read_file(filename):
    try:
        with open(filename, 'r', encoding='utf8') as f:
            data = f.read()
        return data

    except IOError:
        print("Error opening or reading input file: ", filename)
        sys.exit()


def spacy_similarity(file1, file2):
    nlp = spacy.load('en_core_web_sm')

    doc1 = nlp(read_file(file1).lower())
    doc2 = nlp(read_file(file2).lower())

    similarity = doc1.similarity(doc2)
    return similarity


stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)


def stem_tokens(tokens):
    return [stemmer.stem(item) for item in tokens]


def normalize(text):
    '''remove punctuation, lowercase, stem'''
    return stem_tokens(nltk.word_tokenize(text.lower().translate(remove_punctuation_map)))


vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')


def nltk_cosine_sim(text1, text2):
    tfidf = vectorizer.fit_transform([text1, text2])
    return ((tfidf * tfidf.T).A)[0, 1]


translation_table = str.maketrans(
    string.punctuation+string.ascii_uppercase, " "*len(string.punctuation)+string.ascii_lowercase)


def get_words_from_line_list(text):
    text = text.translate(translation_table)
    word_list = text.split()
    return word_list


def count_frequency(word_list):
    D = {}
    for new_word in word_list:
        if new_word in D:
            D[new_word] = D[new_word] + 1
        else:
            D[new_word] = 1
    return D


def word_frequencies_for_file(filename):
    line_list = read_file(filename)
    word_list = get_words_from_line_list(line_list)
    freq_mapping = count_frequency(word_list)
    return freq_mapping


def dotProduct(D1, D2):
    Sum = 0.0
    for key in D1:
        if key in D2:
            Sum += (D1[key] * D2[key])
    return Sum


def vector_angle(D1, D2):
    numerator = dotProduct(D1, D2)
    denominator = math.sqrt(dotProduct(D1, D1)*dotProduct(D2, D2))
    return math.acos(numerator / denominator)


def documentSimilarity(filename_1, filename_2):
    sorted_word_list_1 = word_frequencies_for_file(filename_1)
    sorted_word_list_2 = word_frequencies_for_file(filename_2)
    distance = vector_angle(sorted_word_list_1, sorted_word_list_2)
    return (1 - distance)


def Jaccard_Similarity_formula(doc1, doc2):
    words_doc1 = set(read_file(doc1).lower(
    ).translate(translation_table).split())
    words_doc2 = set(read_file(doc2).lower(
    ).translate(translation_table).split())

    intersection = words_doc1.intersection(words_doc2)
    union = words_doc1.union(words_doc2)
    return float(len(intersection)) / len(union)


def Jaccard_Similarity_func(doc1, doc2):
    words_doc1 = set(read_file(doc1).lower(
    ).translate(translation_table).split())
    words_doc2 = set(read_file(doc2).lower(
    ).translate(translation_table).split())

    union = words_doc1.union(words_doc2)

    doc1 = []
    doc2 = []

    for word in union:
        if(word in words_doc1):
            doc1.append(1)
        else:
            doc1.append(0)
        if(word in words_doc2):
            doc2.append(1)
        else:
            doc2.append(0)
    similarity = jaccard_score(doc1, doc2)
    return similarity


def calcAccuracy(file1, file2):
    similarities = []
    text1 = read_file(file1)
    text2 = read_file(file2)
    similarities.append(["Total Words (Heartz)", len(text1.split(' '))])
    similarities.append(["Total Words (Original)", len(text2.split(' '))])
    # similarities.append(["Spacy Similarity", spacy_similarity(file1, file2)])
    similarities.append(["Cosine Similarity", nltk_cosine_sim(
        read_file(file1), read_file(file2))])
    similarities.append(
        ["Document Similarity", documentSimilarity(file1, file2)])
    similarities.append(
        ["Jaccard Similarity (Implemented)", Jaccard_Similarity_formula(file1, file2)])
    similarities.append(
        ["Jaccard Similarity (Inbuilt)", Jaccard_Similarity_func(file1, file2)])
    return similarities


def getAccuracy(Session_ID, file_name):
    orig_file = Session_ID + '.txt'
    orig_path = Download_Dir + orig_file
    if not os.path.exists(orig_path):
        downloadFromGDrive(orig_file, file_type='txt')

    file_path = Download_Dir + file_name
    return calcAccuracy(orig_path, file_path)
