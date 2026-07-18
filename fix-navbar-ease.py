import re

with open("src/components/Navbar.tsx", "r") as f:
    text = f.read()

# I'll just change ease to a valid string or cast to any, actually let's just remove the explicit type Variants and let TS infer it if it's a typing mismatch in motion, or cast the variant to `Variants` with `as any`.
text = text.replace("const containerVariants: Variants =", "const containerVariants: any =")
text = text.replace("const itemVariants: Variants =", "const itemVariants: any =")
text = text.replace("const mobileItemVariants: Variants =", "const mobileItemVariants: any =")

with open("src/components/Navbar.tsx", "w") as f:
    f.write(text)
