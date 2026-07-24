const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');

const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  let match;
  const regex = /fetch/gi;
  let count = 0;
  while ((match = regex.exec(content)) !== null) {
    count++;
  }
  if (count > 0) console.log(`${file} has ${count} fetches`);
}
