import re

# Fix PortfolioSection.tsx
with open("src/components/PortfolioSection.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    '''  const handleCloseProject = () => {
    if (window.history.state?.modalOpen) { window.history.back(); }
    setSelectedProject(null);
  };''',
    '''  const handleCloseProject = (fromPopState = false) => {
    if (!fromPopState && window.history.state?.modalOpen) { 
      window.history.back(); 
    }
    setSelectedProject(null);
  };'''
)

text = text.replace(
    '''  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (selectedProject) {
        handleCloseProject();
      }
    };''',
    '''  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (selectedProject) {
        handleCloseProject(true);
      }
    };'''
)

with open("src/components/PortfolioSection.tsx", "w", encoding="utf-8") as f:
    f.write(text)

# Fix ClientRequestPage.tsx
with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    client_text = f.read()

client_text = client_text.replace(
    '''    const handlePopState = () => {
      onClose();
    };''',
    '''    const handlePopState = () => {
      // It's already popped, just call onClose
      onClose();
    };'''
)

# And make sure onClick does back instead of onClose, but wait! The parent handles onClose. If parent calls onClose, we unmount.
client_text = client_text.replace(
    "onClick={() => { if (window.history.state?.modalOpen) { window.history.back(); } else { onClose(); } }}",
    "onClick={() => { window.history.back(); }}"
)

with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(client_text)

