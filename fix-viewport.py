import re

with open("index.html", "r") as f:
    text = f.read()

text = text.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />'
)

with open("index.html", "w") as f:
    f.write(text)
