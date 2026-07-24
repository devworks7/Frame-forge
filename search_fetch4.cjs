const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist', 'assets');
const content = fs.readFileSync(path.join(distPath, 'vendor-CPvgO5-Z.js'), 'utf8');
const regex = /.{0,50}fetch.{0,50}/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}
