import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

# I need to close the `) : (` properly.
# The map ends at:
#           ))}
#           {projects.length === 0 && (
#             <div className="col-span-full py-20 text-center">
#               <p className="font-sans text-white/50 text-xs">No project streams are online at this time.</p>
#             </div>
#           )}
#         </div>

# But I replaced the start with `projects.length === 0 ? (...) : (`
# So I just need to remove the old `{projects.length === 0 && (...)}` and close it with `)}` at the end of `</div>`.

text = text.replace("""          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="font-sans text-white/50 text-xs">No project streams are online at this time.</p>
            </div>
          )}
        </div>""", """          ))}
        </div>
        )}""")

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
