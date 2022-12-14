const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: { 
        type: String,
    },
    batch: {
        type: String,
    },
    paymentDate: {
        type: Date,
    },
    paymentStatus:{
        type: Boolean,
        default: false,
    },
    cardholdername:{
        type: String,
    },
    cardnum:{
        type: Number,
    },
    exp:{
        type: String,
    },
    cvv:{
        type: Number,
    },

});

module.exports = mongoose.model('user', userSchema);