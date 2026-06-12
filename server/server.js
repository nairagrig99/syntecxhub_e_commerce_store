const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const app = express();
app.use(express.json());
const User = require('./models/User');
const Products = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();
const bcrypt = require('bcryptjs')
dns.setServers(['8.8.8.8', '8.8.4.4']);
app.use(cors());

const ENV_URL = process.env.MONGO_URI;

const PORT = 5000;

const verifyToken = require('./middlewares/authMiddleware')

const multer = require("multer");

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(ENV_URL)
    .then(() => console.log("Successfully connected to MongoDB Database"))
    .catch(() => console.log('Mongodb Database is FAILED'))

app.get('/', (req, res) => {
    res.send('Server E-Comerece')
})

app.post('/register', async (req, res) => {
    try {
        const {first_name, last_name, email, password, re_password} = req.body

        if (password !== re_password) {
            return res.status(400).json({message: 'Passwords do not match!'})
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }

        let userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({message: "User registered successfully!"})
    } catch (error) {
        res.status(500).json({message: "Server error is this?", error: error.message})
    }

})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const errorMessage = "User email or password are incorrect"

    const emailExist = await User.findOne({email});

    if (!emailExist) {
        return res.status(400).json({message: errorMessage})
    }

    const isPassword = await bcrypt.compare(password, emailExist.password);

    if (!isPassword) {
        return res.status(400).json({message: errorMessage})
    }

    const token = jwt.sign(
        {id: emailExist._id, role: emailExist.role},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    res.status(200).json({
        message: "Login successful!",
        token: token,
        user: {
            id: emailExist._id,
            first_name: emailExist.first_name,
            last_name: emailExist.last_name,
            email: emailExist.email,
            role: emailExist.role,
        }
    })

})

app.get('/products', verifyToken, async (req, res) => {
    try {
        const products = await Products.find({});
        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({message: "Server Error: Could not get products"});
    }
})


app.get('/products/:id', verifyToken, async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (product) {
            res.status(200).json({product});
        } else {
            res.status(404).json({message: 'Product Not Found'})
        }
    } catch (e) {
        res.status(500).json({message: "Invalid Product ID format"});
    }
})

const upload = multer({dest: 'uploads/'});
app.post('/upload', upload.single('image'), async (req, res) => {
    console.log("req", req)
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('__dirname', __dirname);
// create product
app.post('/products', upload.single('image'), async (req, res) => {
        console.log("upload", upload)
        if (!req.body) {
            return res.status(400).json({message: "Form data text fields were not received correctly."});
        }
        console.log("req.file.filename", req.file)

        const {title, description, price, countInStock, user} = req.body;

        if (!title || !price || !description || !countInStock) {
            return res.status(400).json({message: 'Please include all required fields'})
        }

        try {
            const newProduct = await Products.create({
                user,
                title: req.body.title,
                description: req.body.description,
                price: Number(req.body.price),
                countInStock: Number(req.body.countInStock),
                image: `/uploads/${req.file.filename}`
            })
            console.log("newProduct", newProduct)
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({message: "Server Error: Could not create product", error: error.message});
        }
    }
)

app.patch('/products/:id', verifyToken, async (req, res) => {
    const {title, description, price, image, category, brand, countInStock} = req.body;

    try {
        const product = await Products.findById(req.params.id);
        if (product) {
            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price !== undefined ? price : product.price;
            product.image = image || product.image;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

            const updatedProduct = await product.save()

            res.status(200).json(updatedProduct)
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (e) {
        res.status(500).json({message: "Server Error: Could not update product", error: error.message});
    }
})
app.delete('/product/:id', verifyToken, async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted", deletedProduct});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
})

app.post('/cart', verifyToken, async (req, res) => {
    const {_id: productId, title, price, image} = req.body;

    const userId = req.user.id;

    if (!productId) {
        return res.status(400).json({message: "Product ID missing from request body"});
    }

    try {
        let cart = await Cart.findOne({user: userId});
        if (!cart) {
            cart = new Cart({user: userId, items: []});
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {

            cart.items[itemIndex].qty += 1;
        } else {
            cart.items.push({
                product: productId,
                title,
                qty: 1,
                price,
                image
            });
        }


        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: "Failed to update cart", error: error.message});
    }
});

app.get('/cart', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id});

        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(200).json({items: []});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch cart", error: error.message});
    }
});

app.patch('/cart', verifyToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const {productID, qty} = req.body;

        const userCart = await Cart.findOne({user: userID});

        if (!userCart) {
            return res.status(404).json({message: 'User does not exist'})
        }

        const cart = userCart.items.find((cart) => cart.product.toString() === productID);

        if (!cart) {
            return res.status(404).json({message: 'Cart does not exist'});
        }

        cart.qty = qty;

        await userCart.save()
        res.status(200).json({cart})
    } catch (e) {
        res.status(400).json({message: 'failed to update cart quantity', error: e})
    }
})

app.delete('/cart/:id', verifyToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const productID = req.params.id
        const cart = await Cart.findOne({user: userID});
        const findCart = cart.items.find((cart) => cart.product.toString() === productID);

        if (!findCart) {
            res.status(400).json({message: 'Cart did not found'})
        }

        cart.items = cart.items.filter((cart) => cart.product.toString() !== productID);

        cart.save()
        return res.status(200).json({
            message: 'Item removed from cart successfully',
            items: cart.items
        });
    } catch (e) {
        res.status(400).json({message: 'failed to delete cart ', error: e})
    }
})

// checkout

app.post('/orders', verifyToken, async (req, res) => {
    const {user, shippingAddress, paymentMethod, totalPrice} = req.body;
    try {
        const userCart = await Cart.findOne({user})

        const order = new Order({
            user,
            orderItems: userCart.items,
            shippingAddress,
            paymentMethod,
            totalPrice
        })

        const createdOrder = await order.save()

        await Cart.findOneAndUpdate({user}, {items: []});

        res.status(201).json(createdOrder)
    } catch (error) {
        res.status(500).json({message: "Checkout failed", error: error.message});
    }
})

app.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "Could not fetch orders", error: error.message});
    }
});

app.get('/users', async (req, res) => {
    const getAllUsers = await User.find({})
    if (getAllUsers) {
        res.status(200).json(getAllUsers)
    } else {
        res.status(500).json({message: "Could not fetch Users", error: error.message});
    }
})

app.get('/auth/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log("user", user);
        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({user: user, token: req.user.token});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})