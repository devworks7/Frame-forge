const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distPath).filter(f => f.startsWith('index-') && f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  const regex = /.{0,50}fetch.{0,50}/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
  }
}
