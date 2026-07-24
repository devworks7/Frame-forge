const fs = require('fs');
const content = fs.readFileSync('dist/assets/motion-vendor-ilgiGK39.js', 'utf8');
if (content.toLowerCase().includes('fetch')) {
  console.log(`Contains fetch`);
}
