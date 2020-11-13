require('dotenv').config()
// handling of environment variables


const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT

module.exports = {
     MONGODB_URL, 
     PORT
    }