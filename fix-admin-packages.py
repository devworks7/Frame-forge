import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# 1. Update loadDashboardData to include packages, or we can fetch packages separately when tab opens. Let's do it in loadDashboardData for simplicity, but wait, the prompt asks for a loading state while fetching packages: "While fetching packages: Display a skeleton loader. Do not render package fields until loading finishes."
# So let's fetch packages in a separate useEffect or when the tab mounts!

text = text.replace('import ErrorBoundary from "./ErrorBoundary";', '')
text = 'import ErrorBoundary from "./ErrorBoundary";\n' + text

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
