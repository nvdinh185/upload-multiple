const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');

var dirUpload = 'uploads';
if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirUpload);
    },

    filename: function (req, file, cb) {
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', upload.array('multi-files'), (req, res) => {
    res.redirect('/');
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));