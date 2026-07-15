import re

with open("src/components/AdminPanel.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('setSaveSuccessMsg("Project saved successfully.");', 'setSaveSuccessMsg("Portfolio Updated");')
text = text.replace('setSaveSuccessMsg("PDF saved successfully.");', 'setSaveSuccessMsg("Document Saved");')
text = text.replace('setSaveSuccessMsg("FAQ saved successfully.");', 'setSaveSuccessMsg("FAQ Updated");')
text = text.replace('setSaveSuccessMsg("Testimonial saved successfully.");', 'setSaveSuccessMsg("Testimonial Updated");')
text = text.replace('setSaveSuccessMsg("Service capability saved.");', 'setSaveSuccessMsg("Capability Updated");')
text = text.replace('setSaveSuccessMsg("Content saved successfully.");', 'setSaveSuccessMsg("Changes Published");')

with open("src/components/AdminPanel.tsx", "w", encoding="utf-8") as f:
    f.write(text)
