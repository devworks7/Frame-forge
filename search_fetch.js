const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');

const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  if (content.includes('fetch = ') || content.includes('.fetch=') || content.includes('fetch=') || content.includes('.fetch =')) {
    console.log(`Found in ${file}`);
    // extract surrounding characters
    const index = content.indexOf('fetch');
    const start = Math.max(0, index - 100);
    const end = Math.min(content.length, index + 100);
    console.log(content.substring(start, end));
  }
}
