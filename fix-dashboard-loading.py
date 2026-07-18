import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

state_injection = """  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [dashboardLoadError, setDashboardLoadError] = useState<string | null>(null);
"""
text = text.replace('  const [uploadError, setUploadError] = useState<string | null>(null);', state_injection + '  const [uploadError, setUploadError] = useState<string | null>(null);')

load_func_old = """  const loadDashboardData = async () => {
    try {
      const [an, ac, reqList, portList, pdfsList, faqList, testList, textContent, srvList] = await Promise.all([
        getAnalytics(),
        getRecentActivities(),
        getClientRequests(),
        getPortfolioItems(),
        getPDFDocuments(),
        getFAQs(),
        getTestimonials(),
        getSectionContent(),
        getServices()
      ]);
      setAnalytics(an);
      setActivities(ac);
      setRequests(reqList);
      setPortfolio(portList);
      setPdfs(pdfsList);
      setFaqs(faqList);
      setTestimonials(testList);
      setContent(textContent);
      setServices([...srvList].sort((a, b) => a.order - b.order));
    } catch (e) {
      console.error("Dashboard database fetch failed:", e);
    }
  };"""

load_func_new = """  const loadDashboardData = async () => {
    setIsDashboardLoading(true);
    setDashboardLoadError(null);
    try {
      const [an, ac, reqList, portList, pdfsList, faqList, testList, textContent, srvList] = await Promise.all([
        getAnalytics().catch(() => ({ totalVisitors: 0, projectRequests: 0, emailsReceived: 0, videoViews: 0, pdfViews: 0 })),
        getRecentActivities().catch(() => []),
        getClientRequests().catch(() => []),
        getPortfolioItems().catch(() => []),
        getPDFDocuments().catch(() => []),
        getFAQs().catch(() => []),
        getTestimonials().catch(() => []),
        getSectionContent().catch(() => null),
        getServices().catch(() => [])
      ]);
      setAnalytics(an);
      setActivities(ac);
      setRequests(reqList);
      setPortfolio(portList);
      setPdfs(pdfsList);
      setFaqs(faqList);
      setTestimonials(testList);
      setContent(textContent);
      setServices([...srvList].sort((a, b) => a.order - b.order));
    } catch (e: any) {
      console.error("Dashboard database fetch failed:", e);
      setDashboardLoadError("Failed to load dashboard data. Retrying may resolve the issue.");
    } finally {
      setIsDashboardLoading(false);
    }
  };"""

text = text.replace(load_func_old, load_func_new)

# Add dashboard loading UI to the sidebar or main view
sidebar_end = """              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("ff_admin_token");
                  setToken(null);
                  setIsAuthenticated(false);
                  onLoginStateChange(false);
                }}
                className="w-full mt-12 flex items-center space-x-3 px-3 py-3 rounded-xl font-semibold text-rose-400/80 hover:text-rose-400 hover:bg-rose-950/20 transition-all cursor-pointer"
              >
                <LogOut size={16} />
                <span>TERMINATE SESSION</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#050505] overflow-y-auto w-full md:w-auto relative">"""

sidebar_end_new = sidebar_end + """
          {isDashboardLoading && (
            <div className="absolute inset-0 z-50 bg-[#050505]/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest animate-pulse">Syncing Database...</span>
              </div>
            </div>
          )}
          {dashboardLoadError && (
             <div className="m-8 p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-between">
                <span>{dashboardLoadError}</span>
                <button onClick={loadDashboardData} className="px-3 py-1.5 bg-rose-500/20 rounded hover:bg-rose-500/30 transition-colors font-bold uppercase">Retry</button>
             </div>
          )}
"""
text = text.replace(sidebar_end, sidebar_end_new)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
