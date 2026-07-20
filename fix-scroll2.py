with open("src/App.tsx", "r") as f:
    text = f.read()

text = text.replace("""  const handlePageChange = React.useCallback((page: "home" | "pricing" | "proposal") => {
    if (page === "proposal") {
      setShowRequests(true);
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);""", """  const handlePageChange = React.useCallback((page: "home" | "pricing" | "proposal") => {
    if (page === "proposal") {
      setShowRequests(true);
    } else {
      setCurrentPage(page);
    }
  }, []);""")

with open("src/App.tsx", "w") as f:
    f.write(text)
