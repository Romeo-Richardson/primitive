const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()
const path = require('path')
app.use(express.static('public'))
app.use(express.json())
const cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

const ProductModel = require('./models/ProductModel')
const stripe = require('stripe')('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')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ZirrKing:65937675299041230290728123677583@cluster0.5r4pdz7.mongodb.net/primitiveDB?retryWrites=true&w=majority')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
} else app.get('/', (req, res) => {
    res.send('api running')
})

app.post('/stripeCheckout', async (req, res) => {
    const items = req.body
    const lineItems = []
    items.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        })
    })
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://primitive-ecommerce.herokuapp.com/success',
        cancel_url: 'https://primitive-ecommerce.herokuapp.com/cancel'
    })

    res.send(JSON.stringify({
        url: session.url
    }))
})

app.get('/handleProducts', async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
})

app.put('/handleComments', async (req, res) => {
    const id = req.body._id
    const updatedRatings = req.body.rating
    ProductModel.findById(id, async (err, user) => {
        user.ratings = updatedRatings
        await user.save()
    })
})

app.put('/handleAvg', async (req, res) => {
    const id = req.body._id
    const ratingAvg = req.body.avgRating
    ProductModel.findById(id, async (err, user) => {
        if (err) {
            res.json(err)
        } else {
            user.avgRating = ratingAvg
            await user.save()
        }
    })
})

const PORT = process.env.PORT
app.listen(PORT || 3001, () => {
    console.log('Server Running')
})