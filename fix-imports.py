with open("src/components/AdminPanel.tsx", "r") as f:
    content = f.read()

import_str = "import { upload } from '@vercel/blob/client';\n"
if "import { upload } from" not in content:
    content = import_str + content
    with open("src/components/AdminPanel.tsx", "w") as f:
        f.write(content)
