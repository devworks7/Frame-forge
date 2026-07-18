import re

with open("src/components/PortfolioSection.tsx", "r") as f:
    text = f.read()

text = text.replace("""  useEffect(() => {
    async function load() {
      const data = await getPortfolioItems();
      setProjects(data);
    }
    load();
  }, []);""", """  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getPortfolioItems();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load portfolio");
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);""")

with open("src/components/PortfolioSection.tsx", "w") as f:
    f.write(text)
