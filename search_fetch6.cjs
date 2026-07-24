const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  if (content.includes('formdata-polyfill') || content.includes('formdata-node') || content.includes('fetch =')) {
    console.log(`Found in ${file}`);
  }
}
