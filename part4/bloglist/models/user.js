const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


// passwordHash cannot have a minlength can it? not from mongoose-validators atleast
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3},
    name: String, 
    passwordHash: { type: String, required: true},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
}) 

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //no passwords here m8
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
