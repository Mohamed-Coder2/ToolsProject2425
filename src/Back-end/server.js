const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const userRoutes = require ('./Routes/userRoutes')
const orderRoutes = require('./Routes/orderRoute');

const db = require('./db')
const cors = require('cors');

//setting up your port
const PORT = process.env.ServerPORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Replace if port somehow changes
    credentials: true // for cookies
}))

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ alter:true }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

//routes for the order API
app.use('/api/orders', orderRoutes);


//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))