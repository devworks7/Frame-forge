with open("src/components/PricingDocuments.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'import { getPDFDocuments } from "../lib/dataService";',
    'import { getPDFDocuments, getPricingPackages } from "../lib/dataService";'
)

text = text.replace(
    'import { PDFDoc } from "../types";',
    'import { PDFDoc, PricingPackage } from "../types";'
)

state_vars = '''
export default function PricingDocuments() {
  const [documents, setDocuments] = useState<PDFDoc[]>([]);
  const [plans, setPlans] = useState<PricingPackage[]>([]);

  useEffect(() => {
    getPricingPackages().then(data => {
      setPlans(data.filter(p => p.enabled).sort((a, b) => a.order - b.order));
    });
    getPDFDocuments().then(data => {
      setDocuments(data.filter(d => d.downloadsAllowed).sort((a, b) => a.order - b.order));
    });
  }, []);
'''

text = text.split('export default function PricingDocuments() {')[0] + state_vars + text.split('  }, []);\n\n  const plans = [\n    {\n      name: "Standard Cut",\n      price: "€2,500",')[1].split('    },\n  ];\n\n  return (')[1]

with open("src/components/PricingDocuments.tsx", "w") as f:
    f.write(text)
