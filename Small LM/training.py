import json

with open("input.txt", "r") as file:
    text = file.read()

model = {}
n = 6       # n-gram model (you have to generate it with same n)

for i in range(len(text) + 1 - n):
    string = text[i:i + n - 1]
    charcter = text[i + n - 1]
    if not string in model:
        model[string] = {}
    if not charcter in model[string]:
        model[string][charcter] = 0
    model[string][charcter] += 1


with open("analysis.json", "w") as file:
    file.write(json.dumps(model))
