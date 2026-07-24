const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');

const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  let match;
  const regex = /.{0,50}fetch\s*=[^=].{0,50}/g;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${file}`);
    console.log(match[0]);
  }
}
