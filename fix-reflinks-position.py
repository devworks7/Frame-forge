import re

with open("src/components/ClientRequestPage.tsx", "r") as f:
    text = f.read()

# First remove the one we just added
text = re.sub(r'                \{\/\* Reference Links \*\/.*?</div>\n', '', text, flags=re.DOTALL)

reference_field = """                {/* Reference Links */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] text-white/70 mb-1.5">Reference Links (Optional)</label>
                  <input
                    type="text"
                    name="referenceLinks"
                    value={formData.referenceLinks}
                    onChange={handleInputChange}
                    placeholder="Paste URLs to inspiration, assets, or references..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-white text-white focus:outline-none placeholder-zinc-600 font-sans text-[13px]"
                  />
                </div>
"""

new_text = re.sub(
    r'(                  />\n\s*</div>)(\n\s*</div>\n\s*\{\/\* Legal terms \*\/})',
    r'\1\n' + reference_field + r'\2',
    text
)

if new_text != text:
    print("Match found and replaced! Position corrected.")
    with open("src/components/ClientRequestPage.tsx", "w") as f:
        f.write(new_text)
else:
    print("No match found.")
