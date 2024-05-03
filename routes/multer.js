const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const fn = crypto.randomBytes(20).toString('hex') + path.extname(originalname);
      cb(null, fn);
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload