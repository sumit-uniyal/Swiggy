require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/db')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const foodRouter = require('./router/foodRoute')
const userRouter = require('./router/userRoute')
const cartRuter = require('./router/cartRouter')

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

// To parse json And Form Data (Comman Middleware)
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/images',express.static('uploads'))


// Routes
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRuter)

// DB Setup (MongoDB Atlas)
dbConnection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Server is Working')
    })
})
