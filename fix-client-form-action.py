import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

original = r'<div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">'
new_code = r'<div className="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-0 sticky bottom-0 z-20 bg-[#080d12]/95 backdrop-blur-md p-4 sm:p-0 -mx-6 sm:mx-0 border-t border-white/10 sm:static shadow-[0_-10px_20px_rgba(0,0,0,0.5)] sm:shadow-none min-h-[44px]">'

text = text.replace(original, new_code)

with open("src/components/ClientRequestPage.tsx", "w") as f:
    f.write(text)
