const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.log("doesn't exist directory");
  fs.mkdirSync('uploads');
}

app.use(morgan('dev'));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use('/upload', express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('<h1>ok</h1>');
});

app.listen(3000);
