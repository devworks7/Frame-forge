import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'import AdminPanel from "./components/AdminPanel";', 'const AdminPanel = lazy(() => import("./components/AdminPanel"));', content)
content = re.sub(r'import ClientRequestPage from "./components/ClientRequestPage";', 'const ClientRequestPage = lazy(() => import("./components/ClientRequestPage"));', content)
content = re.sub(r'import PricingDocuments from "./components/PricingDocuments";', 'const PricingDocuments = lazy(() => import("./components/PricingDocuments"));', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
