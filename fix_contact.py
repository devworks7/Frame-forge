import re

with open("src/components/ContactSection.tsx", "r") as f:
    content = f.read()

# Remove LinkedIn block
linkedin_pattern = r'\{\s*/\*\s*LinkedIn\s*\*/\s*\}\s*<a[^>]*href=\{content\.contactLinkedIn[^\}]*\}[^>]*>\s*<Linkedin[^>]*/>\s*</a>'
content = re.sub(linkedin_pattern, '', content, flags=re.DOTALL)

# Remove Location HQ panel block completely
# The panel starts at: {/* Premium styled visual HQ location panel */}
hq_pattern = r'\{\s*/\*\s*Premium styled visual HQ location panel\s*\*/\s*\}.*?</div>\s*</div>\s*</div>\s*</div>\s*</section>'
content = re.sub(hq_pattern, '</div>\n      </div>\n    </section>', content, flags=re.DOTALL)

# Change grid class
content = content.replace('className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"', 'className="max-w-lg mx-auto w-full flex flex-col justify-between gap-6"')

# Change col-span class
content = content.replace('className="lg:col-span-5 flex flex-col justify-between gap-6"', 'className="flex flex-col justify-between gap-6"')

with open("src/components/ContactSection.tsx", "w") as f:
    f.write(content)
