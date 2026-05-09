const app = require('./src/app.js')
const config = require('./src/config/config.js')
const connectDB = require('./src/config/database.js')
const PORT = config.PORT || 8080

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})