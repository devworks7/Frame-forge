import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# Inject isPackagesLoading
state_injection = """  const [isPackagesLoading, setIsPackagesLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "packages") {
      const fetchPkgs = async () => {
        setIsPackagesLoading(true);
        try {
          const pkgs = await getPricingPackages();
          if (!Array.isArray(pkgs)) {
            setPackages([]);
          } else {
            setPackages(pkgs);
          }
        } catch (err) {
          setPackages([]);
        } finally {
          setIsPackagesLoading(false);
        }
      };
      fetchPkgs();
    }
  }, [activeTab]);"""

text = text.replace('  const [packages, setPackages] = useState<PricingPackage[]>([]);', '  const [packages, setPackages] = useState<PricingPackage[]>([]);\n' + state_injection)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
