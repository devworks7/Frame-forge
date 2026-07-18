import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "          {projects.length === 0 && (" in line:
        skip = True
        continue
    if skip:
        if "          )}" in line:
            skip = False
            continue
        continue
    new_lines.append(line)

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write("".join(new_lines))
