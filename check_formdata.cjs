const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('dist/assets/' + file, 'utf8');
  if (content.toLowerCase().includes('formdata-polyfill') || content.toLowerCase().includes('formdata-node')) {
    console.log(file + ' has formdata-polyfill');
  }
}
