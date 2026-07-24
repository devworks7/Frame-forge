const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distPath).filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  let match;
  const regex = /.{0,30}\["fetch"\]\s*=[^=].{0,30}/g;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${file}: ${match[0]}`);
  }
}
