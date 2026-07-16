import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

table_original_start = r'<table className="w-full text-left border-collapse text-xs">'
table_new_start = r'<table className="hidden md:table w-full text-left border-collapse text-xs">'

text = re.sub(table_original_start, table_new_start, text)

# Now we need to append the mobile cards after the table closes.
table_end = r'(\s*</table>\n\s*</div>)'

mobile_cards = """
              {/* Mobile Cards View */}
              <div className="md:hidden flex flex-col divide-y divide-white/5 border border-white/5 rounded-2xl bg-[#0a0a0c] overflow-hidden mt-4">
                {paginatedRequests.map((r) => (
                  <div key={r.id + "_mobile"} className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block font-sans font-bold text-white text-sm">{r.fullName}</span>
                        <span className="block font-sans text-xs text-white/50">{r.organizationName || "No Company"}</span>
                      </div>
                      <select
                        value={r.status}
                        onChange={(e) => handleUpdateStatus(r.id, e.target.value as any)}
                        className={`px-2 py-1 rounded-md font-mono text-[9px] font-bold uppercase border focus:outline-none ${
                          r.status === "new" ? "bg-blue-950/40 text-blue-400 border-blue-800" :
                          r.status === "in_progress" ? "bg-yellow-950/40 text-yellow-400 border-yellow-800" :
                          r.status === "completed" ? "bg-green-950/40 text-green-400 border-green-800" :
                          "bg-red-950/40 text-red-400 border-red-800"
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="completed">COMPLETED</option>
                        <option value="rejected">REJECTED</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <span className="block font-sans font-semibold text-white uppercase">{r.projectType}</span>
                      <span className="block text-purple-400 font-mono text-[10px]">{r.budget}</span>
                      <span className="block text-cyan-400">{r.email}</span>
                      <span className="block text-white/50">{r.phoneNumber || "No Phone"}</span>
                      <span className="block font-mono text-[9px] text-white/40 uppercase mt-1">LOC: {r.city || "?"}, {r.country || "?"}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setExpandedRequestId(expandedRequestId === r.id ? null : r.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors ${
                          expandedRequestId === r.id ? "bg-cyan-500 text-black" : "bg-white/5 text-white/70"
                        }`}
                      >
                        <Eye size={12} />
                        <span>{expandedRequestId === r.id ? "Hide Specs" : "View Specs"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRequest(r.id)}
                        className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 bg-red-500/10 text-red-400 border border-red-500/20"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {expandedRequestId === r.id && (
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-4 text-xs font-sans mt-3 animate-fade-in">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Project Specification details</span>
                          <p className="text-white/90 whitespace-pre-wrap font-sans text-xs bg-[#030304] p-3 rounded-xl border border-white/5 leading-relaxed shadow-inner">
                            {r.description}
                          </p>
                        </div>
                        <div className="space-y-3 pt-2 border-t border-white/5">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Reference Links</span>
                            <div className="text-white/70 break-all font-mono text-[11px] bg-black/20 p-2.5 rounded-lg border border-white/5">
                              {r.referenceLinks || "No reference links supplied."}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase text-[#C8A96A] block font-bold tracking-wider">Uploaded Specification Document</span>
                            <div className="text-white/70 block font-mono text-[11px] bg-black/20 p-2.5 rounded-lg border border-white/5">
                              {r.fileName ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 overflow-hidden pr-2">
                                    <FileText size={12} className="text-cyan-400 shrink-0" />
                                    <a href={r.fileUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline truncate transition-colors">
                                      {r.fileName}
                                    </a>
                                  </div>
                                  <a href={r.fileUrl} target="_blank" rel="noreferrer" className="shrink-0 p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors">
                                    <Download size={10} />
                                  </a>
                                </div>
                              ) : "No file attached."}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
"""

# Find the exact match of the table end in TAB 2: CLIENT REQUESTS
# We will just replace `</table>\n              </div>` with `</table>\n              </div>\n` + mobile_cards
match = re.search(r'</table>\n\s*</div>', text)
if match:
    text = text[:match.end()] + mobile_cards + text[match.end():]
else:
    print("Could not find table end!")

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
