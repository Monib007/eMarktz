const port = 4000;
const express = require('express')
const app = express();

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')   // access to backend directory in express app

const cors = require('cors')

const fs = require('fs');

const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


app.use(express.json());
app.use(cors());   // connect  react app to express app at 4000 PORT

// Database connection with MongoDB
mongoose.connect('mongodb+srv://monib007:Monib007@cluster0.ijgjblk.mongodb.net/eMarktz')

// API creation

app.get('/', (req, res) => {
    res.send('Express App is Running')
})

// Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port, (error) => {
    if(!error) {
        console.log('Server running on PORT '+port);
    }
    else {
        console.log('Error : '+error);
    }
})