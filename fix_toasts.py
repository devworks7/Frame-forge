import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

toast_jsx = """
      {saveSuccessMsg && (
        <div className="fixed bottom-4 right-4 bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 z-50 backdrop-blur-md animate-fade-in">
          <CheckCircle size={18} />
          <span className="font-sans font-medium text-sm">{saveSuccessMsg}</span>
        </div>
      )}
      {saveError && (
        <div className="fixed bottom-4 right-4 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 z-50 backdrop-blur-md animate-fade-in">
          <AlertTriangle size={18} />
          <span className="font-sans font-medium text-sm">{saveError}</span>
        </div>
      )}
"""

text = text.replace("    </div>\n  );\n}", f"{toast_jsx}    </div>\n  );\n}}")

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
