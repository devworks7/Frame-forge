import re

with open('src/components/ClientRequestPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('body: JSON.stringify({ requestDetails: request }),\n      setSubmitSuccess(true);', 'body: JSON.stringify({ requestDetails: request }),\n      });\n      setSubmitSuccess(true);')

with open('src/components/ClientRequestPage.tsx', 'w') as f:
    f.write(content)
