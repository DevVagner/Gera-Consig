const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Historic = require('../models/Historic')
const { find } = require('../models/User')

const contacts = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/contacts', {isAdmin: find.isAdmin, contacts: find.contacts})
})

async function code() {
    const length = 40;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let idPost = '';

    for (let i = 0; i < length; i++) {
        idPost += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return String(idPost);
}

async function validCode() {
    while (true) {
        const idPost = await code()
        const findCode = await User.find({})
        let find = false

        findCode.forEach((user) => {
            user.contacts.forEach((contact) => {
                if (findCode == contact.id) {
                    find = true
                }
            })
        })

        if (find) {
            continue
        } else {
            return idPost;
        }
    }
}

const newContact = asyncHandler(async(req, res) => {
    try {
        const { title, content } = req.body

        const data = Date.now();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formater = new Intl.DateTimeFormat('pt-BR', options);
        const dataFormat = formater.format(data);

        const id = await validCode()

        let filter = content.trim()

        const saveContacts = await User.findByIdAndUpdate(req.cookies._id, {
            $push: {
                contacts: {
                    "id": id,
                    "title": title,
                    "content": filter.split("\n")
                },
            }
        })

        if (saveContacts.id_admin == "63f339ba64a838f6882aa2a8") {
            const historic = await Historic.create({"action": `Novo contato adicionado: ${title}`, "name": saveContacts.name, "id_user": saveContacts._id, "credits_sms": saveContacts.credits_sms, "credits_whatsapp": saveContacts.credits_whatsapp, "date": dataFormat, id_admin: "63f339ba64a838f6882aa2a8"})
        } else if (saveContacts.id_admin == "640b38d77ec66631a7b9380c") {
            const historic = await Historic.create({"action": `Novo contato adicionado: ${title}`, "name": saveContacts.name, "id_user": saveContacts._id, "credits_sms": saveContacts.credits_sms, "credits_whatsapp": saveContacts.credits_whatsapp, "date": dataFormat, id_admin: "640b38d77ec66631a7b9380c"})
        }

        res.sendStatus(200)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

const delContact = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params

        const del = await User.findByIdAndUpdate(req.cookies._id, {
            $pull: {
                contacts: {
                    "id": id,
                }
            }
        })

        res.sendStatus(200)

    } catch (err) {
        res.send(500)
    }
})

module.exports = {
    contacts,
    newContact,
    delContact
}