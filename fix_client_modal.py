import re

with open("src/components/ClientRequestPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add useEffect import
text = text.replace(
    'import React, { useState } from "react";',
    'import React, { useState, useEffect } from "react";'
)

# Add body scroll lock
scroll_lock = r'''
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Add history API for back button
    window.history.pushState({ modalOpen: true }, '');
    const handlePopState = () => {
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
  }, [onClose]);
'''

text = text.replace(
    'export default function ClientRequestPage({ onClose }: ClientRequestPageProps) {\n  const [formData, setFormData] = useState({',
    'export default function ClientRequestPage({ onClose }: ClientRequestPageProps) {' + scroll_lock + '\n  const [formData, setFormData] = useState({'
)

# Support back navigation
text = text.replace('onClick={onClose}', 'onClick={() => { if (window.history.state?.modalOpen) { window.history.back(); } else { onClose(); } }}')

with open("src/components/ClientRequestPage.tsx", "w", encoding="utf-8") as f:
    f.write(text)
