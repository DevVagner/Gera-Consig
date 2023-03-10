const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
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
    campaings: {
        type: Array,
        default: []
    },
    contacts: {
        type: Array,
        default: []
    },
    id_admin: {
        type: String,
        require: true
    },
    credits_whatsapp: {
        type: Number,
        require: true
    },
    credits_sms: {
        type: Number,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBloqued: {
        type: Boolean,
        default: false
    },
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Users', User);
