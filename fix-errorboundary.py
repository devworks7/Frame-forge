with open("src/components/ErrorBoundary.tsx", "r") as f:
    text = f.read()

text = text.replace("Component<Props, State>", "React.Component<Props, State>")
text = text.replace("import React, { Component, ErrorInfo, ReactNode }", "import React, { ErrorInfo, ReactNode }")

with open("src/components/ErrorBoundary.tsx", "w") as f:
    f.write(text)
