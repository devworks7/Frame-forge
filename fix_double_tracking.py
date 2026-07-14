import os

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            content = content.replace("tracking-tight text-[42px] md:text-[56px] text-white leading-[1.05] tracking-tight", "text-[42px] md:text-[56px] text-white leading-[1.05] tracking-tight")
            content = content.replace("font-display font-medium tracking-tight text-[42px]", "font-display font-medium text-[42px]")
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
