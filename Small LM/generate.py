import json
import random

with open("analysis.json") as file:
    model = json.loads(file.read())

n = 6   # n-gram model (you have to train it with same n)
beginning = input(f"Write {n - 1} characters: ")

def analizuj(text):
    return model.get(text[-n+1:])

def generate(beginning):
    probability = list(sorted(analizuj(beginning).items(), key=lambda item: item[1]))
    #return probability[-1][0]      #highest probability
    celkem = sum(dict(probability).values())
    rnum = random.randint(1, celkem)
    while rnum > 0:
        zn, num = probability.pop(0)
        rnum -= num
    return zn

for i in range(1000):
    beginning += generate(beginning)

print(beginning)
