import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

# Remove body scroll locks
text = re.sub(r"\s*document\.body\.style\.overflow = 'hidden';", "", text)
text = re.sub(r"\s*document\.body\.style\.overflow = '';", "", text)

# Fix video resize on mobile
# Find video tag in fullscreen modal
video_original = r'<video([^>]*)className="w-full max-w-5xl rounded-xl border border-white/10 shadow-2xl bg-black"'
video_new = r'<video\1className="w-full max-w-5xl rounded-lg md:rounded-xl border border-white/10 shadow-2xl bg-black object-contain"'
text = re.sub(video_original, video_new, text)

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
