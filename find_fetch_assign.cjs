const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('dist/assets/' + file, 'utf8');
  let match;
  const regex = /.{0,50}(window|globalThis|global|self)\[?"?fetch"?\]?\s*=[^=].{0,50}/g;
  while ((match = regex.exec(content)) !== null) {
    console.log(`Found in ${file}: ${match[0]}`);
  }
}
