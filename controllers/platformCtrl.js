const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Historic = require('../models/Historic')

const dashboard = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)
    const historic = await Historic.find({id_user: req.cookies._id}).limit(10)

    const campaings = []
    const contacts = []
    
    find.campaings.forEach((campaing) => {
        if (campaing.status == "process") campaings.push(campaing)
    })

    find.contacts.forEach((contact) => {
        contact.content.forEach((number) => {
            contacts.push(number)
        })
    })

    res.render('layouts/dashboard', {isAdmin: find.isAdmin, campaings: campaings, num_campaings: campaings.length, historic: historic, contacts: contacts.length, credits_whatsapp: find.credits_whatsapp, credits_sms: find.credits_sms})
})

const credits = asyncHandler(async(req, res) => {
    const findUser = await User.findById(req.cookies._id)

    if (findUser.id_admin == "63f339ba64a838f6882aa2a8") {
        res.render('layouts/credits', {isAdmin: findUser.isAdmin, name_admin: "Leandro", link: "https://api.whatsapp.com/send?phone=5551992687777&text=Ol%C3%A1,%20gostaria%20de%20reabastecer%20o%20meu%20saldo%20na%20plataforma."})
    } else if (findUser.id_admin == "640b38d77ec66631a7b9380c") {
        res.render('layouts/credits', {isAdmin: findUser.isAdmin, name_admin: "Victor", link: "https://api.whatsapp.com/send?phone=5579981622945&text=Ol%C3%A1,%20gostaria%20de%20reabastecer%20o%20meu%20saldo%20na%20plataforma."})
    }
})

const logout = asyncHandler(async(req, res) => {
    res.cookie('_id', '', { expires: new Date(0) })
    res.redirect("/login")
})

module.exports = 
{   dashboard,
    credits,
    logout
}