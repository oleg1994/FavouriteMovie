const mongoose = require('mongoose');


const userList = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    movies: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('list', userList);