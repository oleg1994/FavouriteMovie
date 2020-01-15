const mongoose = require('mongoose');


const watchList = new mongoose.Schema({
    listname: {
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
module.exports = mongoose.model('watchList', watchList);