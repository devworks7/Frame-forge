with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

text = text.replace("        </div>\n      </div>\n\n      {/* FULLSCREEN PREVIEW MODAL */}", "        </div>\n        )}\n      </div>\n\n      {/* FULLSCREEN PREVIEW MODAL */}")

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
