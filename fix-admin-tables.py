import re

with open('src/components/AdminPanel.tsx', 'r') as f:
    content = f.read()

# We need to find the </tbody></table></div> block after the table mapping.
# The table ends around here:
#                         {expandedRequestId === r.id && (
#                           ...
#                         )}
#                       </React.Fragment>
#                     ))}
#                   </tbody>
#                 </table>
#               </div>

mobile_cards_code = """
              </div>

              {/* Mobile Card Rendering */}
              <div className="md:hidden space-y-4">
                {paginatedRequests.map((r) => (
                  <div key={r.id} className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-4 space-y-4">
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
                    <div className="text-xs space-y-1">
                      <span className="block text-cyan-400">{r.email}</span>
                      <span className="block text-white/50">{r.phoneNumber || "No Phone"}</span>
                      <span className="block font-mono text-[9px] text-white/40 mt-1 uppercase">LOC: {r.city || "?"}, {r.country || "?"}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div>
                        <span className="block font-sans font-semibold text-white uppercase text-xs">{r.projectType}</span>
                        <span className="block text-purple-400 font-mono text-[10px]">{r.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setExpandedRequestId(expandedRequestId === r.id ? null : r.id)}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            expandedRequestId === r.id
                              ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                              : "bg-white/5 hover:bg-white/10 text-white/70"
                          }`}
                          title="View full specs"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRequest(r.id)}
                          className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                          title="Delete request"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    {expandedRequestId === r.id && (
                      <div className="bg-black/30 rounded-xl p-4 mt-2 border border-white/5 text-xs text-white/80 space-y-3">
                        <div className="space-y-1">
                          <span className="block font-bold text-white uppercase text-[10px] text-white/40">Requirements</span>
                          <p className="font-sans leading-relaxed">{r.projectDetails || "No detailed requirements provided."}</p>
                        </div>
                        {r.timeline && (
                          <div className="space-y-1">
                            <span className="block font-bold text-white uppercase text-[10px] text-white/40">Timeline</span>
                            <p className="font-sans">{r.timeline}</p>
                          </div>
                        )}
                        {r.referenceLinks && (
                          <div className="space-y-1">
                            <span className="block font-bold text-white uppercase text-[10px] text-white/40">References</span>
                            <p className="font-sans break-all">{r.referenceLinks}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
"""

content = content.replace("              </div>\n\n              {/* Pagination controls */}", mobile_cards_code + "\n              {/* Pagination controls */}")

with open('src/components/AdminPanel.tsx', 'w') as f:
    f.write(content)
