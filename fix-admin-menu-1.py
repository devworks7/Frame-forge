import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'ArrowUp, ArrowDown, Plus, HelpCircle, UserPlus, Sparkles, X, Edit, Boxes, Database, Edit2',
    'ArrowUp, ArrowDown, Plus, HelpCircle, UserPlus, Sparkles, X, Edit, Boxes, Database, Edit2, Menu'
)

text = text.replace(
    'const [activeTab, setActiveTab] = useState<"metrics" | "requests" | "portfolio" | "pdfs" | "content" | "services" | "packages">("metrics");',
    'const [activeTab, setActiveTab] = useState<"metrics" | "requests" | "portfolio" | "pdfs" | "content" | "services" | "packages">("metrics");\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
