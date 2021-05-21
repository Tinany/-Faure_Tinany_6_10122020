//Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Model
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Single mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);