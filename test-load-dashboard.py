import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

print("isDashboardLoading in text:", "isDashboardLoading" in text)
