const mongoose = require('mongoose')
require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('User', schema)