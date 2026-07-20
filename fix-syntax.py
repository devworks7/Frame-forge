with open("src/App.tsx", "r") as f:
    text = f.read()

text = text.replace("||||", "")

with open("src/App.tsx", "w") as f:
    f.write(text)
