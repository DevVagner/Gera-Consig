const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Finances = require('../models/Finances')
const Historic = require('../models/Historic')

const feedbacks = asyncHandler(async(req, res) => {
    const getFeedbacks = await Feedbacks.find({}).lean()

    res.render('layouts/feedbacks', { isAdmin: true, feedbacks: getFeedbacks })
})

const users = asyncHandler(async(req, res) => {
    const users = await User.find({id_admin: req.cookies._id})

    res.render('layouts/users', { isAdmin: true, users: users })
})

const newUser = asyncHandler(async(req, res) => {
    res.render('layouts/new_user', { isAdmin: true })
})

const saveUser = asyncHandler(async(req, res) => {
    try {
        const { name, email, password, number, credits_whatsapp, credits_sms } = req.body

        const data = Date.now();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formater = new Intl.DateTimeFormat('pt-BR', options);
        const dataFormat = formater.format(data);

        if (req.cookies._id == "63f339ba64a838f6882aa2a8") {
            const newUser = await User.create({name: name, email: email, password: password, number: number, credits_whatsapp: parseInt(credits_whatsapp), credits_sms: parseInt(credits_sms), date: dataFormat, id_admin: "63f339ba64a838f6882aa2a8"})
        } else if (req.cookies._id == "640b38d77ec66631a7b9380c") {
            const newUser = await User.create({name: name, email: email, password: password, number: number, credits_whatsapp: parseInt(credits_whatsapp), credits_sms: parseInt(credits_sms), date: dataFormat, id_admin: "640b38d77ec66631a7b9380c"})
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const infoUser = asyncHandler(async(req, res) => {
    const find = await User.findById(req.params.id)

    res.render('layouts/info_user', { isAdmin: true, find: find })
})

const updateUser = asyncHandler(async(req, res) => {
    try {
        const { name, email, password, number, credits_whatsapp, credits_sms } = req.body

        const newUser = await User.findByIdAndUpdate(req.params.id, {name: name, email: email, password: password, number: number, credits_whatsapp: parseInt(credits_whatsapp), credits_sms: parseInt(credits_sms)})

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    try {
        const id_user = req.params.id

        const block = await User.findByIdAndUpdate({_id: id_user}, {
            "isBloqued": true
        })

        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
})

const unlockUser = asyncHandler(async(req, res) => {
    try {
        const id_user = req.params.id

        const block = await User.findByIdAndUpdate({_id: id_user}, {
            "isBloqued": false
        })

        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
})

const deleteUser = asyncHandler(async(req, res) => {
    try {
        const id_user = req.params.id

        const delUser = await User.findByIdAndDelete(id_user)

        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
})

const finance = asyncHandler(async(req, res) => {
    const finance = await Finances.find({}).lean()

    valueTotal = 0

    finance.forEach((value) => {
        valueTotal = valueTotal + value.value
    })

    res.render('layouts/finance', { isAdmin: true, finance: finance, valueTotal: valueTotal })
})

const historics = asyncHandler(async(req, res) => {
    const find = await Historic.find({id_admin: req.cookies._id})

    res.render('layouts/allHistorics', { isAdmin: true, historics: find })
})

module.exports = {
    feedbacks,
    users,
    newUser,
    saveUser,
    infoUser,
    updateUser,
    blockUser,
    unlockUser,
    deleteUser,
    finance,
    historics
}