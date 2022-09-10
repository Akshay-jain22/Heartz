from gingerit.gingerit import GingerIt


def GrammarCorrection(text):
    try:
        ginger = GingerIt()
        return ginger.parse(text)['result']
    except:
        return text


Text = """Hello everyone, as we all know that there are a lot of existing tools present for speech to text conversions but none of them is purely focused on online classes! Hence, we team superluminal sicks is participating in SIH 2022 to provide an online tool to create automated notes from audio or video recordings Now we will move to the demonstration of the tool"""

if False:
    print(GrammarCorrection(Text))
