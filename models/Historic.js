const mongoose = require('mongoose')

const Historic = new mongoose.Schema({
    action: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    id_user: {
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
    id_admin: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Historic', Historic);
