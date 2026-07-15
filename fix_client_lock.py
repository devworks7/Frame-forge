with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

old_effect = """  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Add history API for back button
    window.history.pushState({ modalOpen: true }, '');
    const handlePopState = () => {
      // It's already popped, just call onClose
      onClose();
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);"""

new_effect = """  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Add history API for back button
    window.history.pushState({ modalOpen: true }, '');
    const handlePopState = () => {
      // It's already popped, just call onClose
      onClose();
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);"""

text = text.replace(old_effect, new_effect)
with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
