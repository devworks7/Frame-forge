import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'setSaveError(err.message || "Failed to save project.");',
    'setSaveError(err.message || "Failed to save project.");\n      setTimeout(() => setSaveError(null), 5000);'
)
text = text.replace(
    'setSaveError(err.message || "Failed to save pdf document.");',
    'setSaveError(err.message || "Failed to save pdf document.");\n      setTimeout(() => setSaveError(null), 5000);'
)
text = text.replace(
    'setSaveError(err.message || "Failed to save content.");',
    'setSaveError(err.message || "Failed to save content.");\n      setTimeout(() => setSaveError(null), 5000);'
)
text = text.replace(
    'setSaveError(err.message || "Failed to save faq.");',
    'setSaveError(err.message || "Failed to save faq.");\n      setTimeout(() => setSaveError(null), 5000);'
)
text = text.replace(
    'setSaveError(err.message || "Failed to save testimonial.");',
    'setSaveError(err.message || "Failed to save testimonial.");\n      setTimeout(() => setSaveError(null), 5000);'
)
text = text.replace(
    'setSaveError(err.message || "Failed to save service.");',
    'setSaveError(err.message || "Failed to save service.");\n      setTimeout(() => setSaveError(null), 5000);'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
