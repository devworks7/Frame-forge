import re
import glob

for file_path in glob.glob("src/**/*.tsx", recursive=True):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()
    
    if "min-h-screen" in text or "h-screen" in text:
        text = text.replace("min-h-screen", "min-h-[100dvh]")
        text = text.replace("h-screen", "h-[100dvh]")
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(text)

