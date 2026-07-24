const fs = require('fs');
const content = fs.readFileSync('dist/assets/vendor-CPvgO5-Z.js', 'utf8');
const words = ['cloudinary', 'mongoose', 'google', 'node-fetch', 'formdata-polyfill'];
for (const word of words) {
  if (content.toLowerCase().includes(word)) {
    console.log(`Contains ${word}`);
  }
}
