import multer from 'multer';
const storage = {
  _handleFile: function(req, file, cb) {
    cb(null, { mydata: "test" });
  },
  _removeFile: function(req, file, cb) {
    cb(null);
  }
};
const upload = multer({ storage });
console.log("Multer custom storage initialized");
