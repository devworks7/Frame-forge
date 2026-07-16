with open("src/components/AboutSection.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    "Frame Forge is a creative studio focused on crafting premium websites, cinematic edits, and digital experiences that help businesses stand out. We combine modern design, thoughtful storytelling, and AI-powered workflows to create work that looks professional, builds trust, and leaves a lasting impression. Every project is approached with attention to detail, ensuring a polished result that reflects your brand with confidence.",
    "Frame Forge creates premium websites, cinematic video edits, and digital experiences for businesses that want to stand out. By combining modern design, creative storytelling, and AI-powered workflows, we deliver polished, high-quality work tailored to each client's goals and brand identity."
)

with open("src/components/AboutSection.tsx", "w", encoding="utf-8") as f:
    f.write(text)

with open("src/lib/seedData.ts", "r", encoding="utf-8") as f:
    text2 = f.read()

text2 = text2.replace(
    "Frame Forge is an elite creative post-production laboratory specializing in high-end CGI, visual effects, and fluid pacing. We partner with leading startups, filmmakers, and digital builders globally to turn standard captures into high-concept artistic campaigns. We operate with cutting-edge workflows to ensure every frame is refined, polished, and powerful.",
    "Frame Forge creates premium websites, cinematic video edits, and digital experiences for businesses that want to stand out. By combining modern design, creative storytelling, and AI-powered workflows, we deliver polished, high-quality work tailored to each client's goals and brand identity."
)

with open("src/lib/seedData.ts", "w", encoding="utf-8") as f:
    f.write(text2)

