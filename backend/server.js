const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const patientRoutes = require('./roots/patientRoutes')
const roomRoutes = require('./roots/roomRoutes')
const doctorRoutes = require('./roots/doctorRoutes')
const cors = require('cors')
const morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :response-time ms'))

connectDB()

// Routes
app.use('/patients', patientRoutes)
app.use('/rooms', roomRoutes)
app.use('/doctors',doctorRoutes)


const PORT = 5000
app.listen(PORT , ()=>{console.log(`SERVER RUNING ON PORT : ${PORT}`)})



