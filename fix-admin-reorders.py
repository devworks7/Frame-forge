import re

with open("src/components/AdminPanel.tsx", "r") as f:
    text = f.read()

# handleReorderProject
pattern1 = r"""    await Promise\.all\(\[
      savePortfolioItem\(list\[idx\]\),
      savePortfolioItem\(list\[nextIdx\]\)
    \]\);
    setPortfolio\(list\);"""

replacement1 = """    try {
      await Promise.all([
        savePortfolioItem(list[idx]),
        savePortfolioItem(list[nextIdx])
      ]);
      setPortfolio(list.sort((a, b) => a.order - b.order));
    } catch (err: any) {
      alert(err.message || "Reorder failed");
    }"""

text = text.replace(pattern1, replacement1)

# handleReorderService
pattern2 = r"""    await Promise\.all\(\[
      saveServiceItem\(list\[idx\]\),
      saveServiceItem\(list\[nextIdx\]\)
    \]\);
    setServices\(list\);"""

replacement2 = """    try {
      await Promise.all([
        saveServiceItem(list[idx]),
        saveServiceItem(list[nextIdx])
      ]);
      setServices(list.sort((a, b) => a.order - b.order));
    } catch (err: any) {
      alert(err.message || "Reorder failed");
    }"""

text = text.replace(pattern2, replacement2)

with open("src/components/AdminPanel.tsx", "w") as f:
    f.write(text)
