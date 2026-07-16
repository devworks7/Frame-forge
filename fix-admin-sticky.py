import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Make form actions sticky on mobile
form_actions_regex = r'<div className="sm:col-span-2 flex justify-end space-x-4 mt-2([^"]*)">'
replacement = r'<div className="sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-4 mt-4 sticky bottom-4 z-10 bg-[#0a0a0c]/95 backdrop-blur-md p-4 -mx-4 rounded-xl border border-white/10 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:mx-0 sm:border-0 shadow-2xl sm:shadow-none">'

text = re.sub(form_actions_regex, replacement, text)

# For content sections which use: <div className="flex justify-end pt-2">
content_actions_regex = r'<div className="flex justify-end pt-2">'
replacement_content = r'<div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-2 sticky bottom-4 z-10 bg-[#0a0a0c]/95 backdrop-blur-md p-4 -mx-4 rounded-xl border border-white/10 sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:mx-0 sm:border-0 shadow-2xl sm:shadow-none">'

text = re.sub(content_actions_regex, replacement_content, text)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
