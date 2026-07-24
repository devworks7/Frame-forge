const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('dist/assets/' + file, 'utf8');
  if (content.toLowerCase().includes('node-fetch')) {
    console.log(file + ' has node-fetch');
  }
}
