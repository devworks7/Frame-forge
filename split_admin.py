import re
import os

with open('src/components/AdminPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We will extract the contents of:
# {activeTab === "metrics" && (...)}
# {activeTab === "requests" && (...)}
# {activeTab === "portfolio" && (...)}
# {activeTab === "pdfs" && (...)}
# {activeTab === "content" && content && (...)}
# {activeTab === "services" && (...)}

# To do this safely, we need to extract the JSX for each tab, and replace it with a component call.
# Then we create the component files.

# But wait, python regex for balanced braces is hard.
