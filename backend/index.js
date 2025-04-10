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

// schema for creating products

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// app.post('/addproduct', async (req, res) => {
//     // let products = await Products.find({});
//     // let id;
//     // if(products.length > 0) {
//     //     let last_product_array = products.slice(-1);
//     //     let last_product = last_product_array[0];
//     //     id = last_product.id + 1;
        

//     // } else {
//     //     id = 1;
//     // }
//     const last_product = await Products.findOne().sort({ id: -1 });
//         const id = last_product ? last_product.id + 1 : 1;

//     const product = new Products({
//         id,
//         name: req.body.name,
//         image: req.body.image,
//         category:  req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     })
//     console.log(product);
//     await product.save();
//     console.log('Saved');

//     res.json({
//         success: true,
//         name: req.body.name,
//     })
// })

app.post('/addproduct', async (req, res) => {
    try {
        const last_product = await Product.findOne().sort({ id: -1 });
        console.log("Last product:", last_product);

        const id = last_product && !isNaN(last_product.id) ? last_product.id + 1 : 1;
        console.log("New product ID:", id);

        const product = new Products({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log('Product saved:', product);

        res.json({
            success: true,
            name: product.name,
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});


// API for deleting products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log('Removed')
    res.json({
        success: true,
        name: req.body.name,
    })
})

//creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log('All Products Fetched')

    res.send(products);
})

app.listen(port, (error) => {
    if(!error) {
        console.log('Server running on PORT '+port);
    }
    else {
        console.log('Error : '+error);
    }
})