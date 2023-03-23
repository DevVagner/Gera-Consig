const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    pendings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBloqued: {
        type: Boolean,
        default: false
    },
    value: {
        type: String,
        require: true
    }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Users', User);
