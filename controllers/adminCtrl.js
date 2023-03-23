const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Finances = require('../models/Finances')
const Historic = require('../models/Historic')

const pendings = asyncHandler(async(req, res) => {
    const find = await User.find()

    const pendings = []
    const concluded = []

    find.forEach((item) => {
        item.pendings.forEach((pending) => {
            if (pending.status == "pending") {
                pendings.push(pending)
            } else if (pending.status == "concluded") {
                concluded.push(pending)
            }
        })
    })

    res.render('layouts/pendings', { isAdmin: true, pending: pendings, concluded: concluded })
})

const users = asyncHandler(async(req, res) => {
    const users = await User.find()

    res.render('layouts/users', { isAdmin: true, users: users })
})

const newUser = asyncHandler(async(req, res) => {
    res.render('layouts/new_user', { isAdmin: true })
})

const saveUser = asyncHandler(async(req, res) => {
    try {
        const { name, email, password, value} = req.body

        const data = Date.now();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formater = new Intl.DateTimeFormat('pt-BR', options);
        const dataFormat = formater.format(data);

        const newUser = await User.create({name: name, email: email, password: password, value: value, date: dataFormat})

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

module.exports = {
    pendings,
    users,
    newUser,
    saveUser,
    infoUser,
    updateUser,
    blockUser,
    unlockUser,
    deleteUser,
}