const mongoose = require('mongoose')
const config = require('./config.js')
const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
}

module.exports = connectDB;