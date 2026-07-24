const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  if (content.includes('defineProperty')) {
    let match;
    const regex = /.{0,30}defineProperty.{0,30}/g;
    while ((match = regex.exec(content)) !== null) {
      if (match[0].includes('fetch')) {
         console.log(`Found in ${file}: ${match[0]}`);
      }
    }
  }
}
