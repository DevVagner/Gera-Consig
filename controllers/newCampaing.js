const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Historic = require('../models/Historic')

async function code() {
    const length = 40;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let id_campaing = '';

    for (let i = 0; i < length; i++) {
        id_campaing += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return String(id_campaing);
}

async function validCode() {
    while (true) {
        const id_campaing = await code()
        const findCode = await User.find({})
        let find = false

        findCode.forEach((user) => {
            user.campaings.forEach((campaing) => {
                if (findCode == campaing.id_campaing) {
                    find = true
                }
            })
        })

        if (find) {
            continue
        } else {
            return id_campaing;
        }
    }
}

const campaings = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/campaings', {isAdmin: find.isAdmin, campaings: find.campaings})
})

const newCampaing = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render("layouts/new_campaing", { isAdmin: find.isAdmin, contacts: find.contacts, credits_sms: find.credits_sms, credits_whatsapp: find.credits_whatsapp })
})

const saveCampaing = asyncHandler(async(req, res) => {
    try {
        const { name, content, contact, platform, number_redirect, credits_remaing, total_contacts, credits, image } = req.body

        const data = Date.now();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formater = new Intl.DateTimeFormat('pt-BR', options);
        const dataFormat = formater.format(data);

        const findUser = await User.findById(req.cookies._id)

        if (findUser) {
            const id_campaing = await validCode()

            if (platform == "whatsapp") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    "credits_whatsapp": parseInt(credits_remaing),
                    $push: {
                        "campaings": {
                            "id_campaing": id_campaing,
                            "name_campaing": name,
                            "content": content,
                            "image": image,
                            "contact_id": contact,
                            "number_redirect": number_redirect,
                            "credits": credits,
                            "platform": "whatsapp",
                            "total_contacts": total_contacts,
                            "date": dataFormat,
                            "status": "process",
                            "messages_send": 0,
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });
            } else if (platform == "sms") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    "credits_sms": parseInt(credits_remaing),
                    $push: {
                        "campaings": {
                            "id_campaing": id_campaing,
                            "name_campaing": name,
                            "content": content,
                            "image": image,
                            "contact_id": contact,
                            "number_redirect": number_redirect,
                            "credits": credits,
                            "platform": "sms",
                            "total_contacts": total_contacts,
                            "date": dataFormat,
                            "status": "process",
                            "messages_send": 0,
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });
            }
            
            const findUser = await User.findById({_id: req.cookies._id})

            if (findUser.id_admin == "63f339ba64a838f6882aa2a8") {
                const historic = await Historic.create({"action": `Nova campanha criada: ${name}`, "name": findUser.name, "id_user": findUser._id, "credits_sms": findUser.credits_sms, "credits_whatsapp": findUser.credits_whatsapp, "date": dataFormat, id_admin: "63f339ba64a838f6882aa2a8"})
            } else if (findUser.id_admin == "640b38d77ec66631a7b9380c") {
                const historic = await Historic.create({"action": `Nova campanha criada: ${name}`, "name": findUser.name, "id_user": findUser._id, "credits_sms": findUser.credits_sms, "credits_whatsapp": findUser.credits_whatsapp, "date": dataFormat, id_admin: "640b38d77ec66631a7b9380c"})
            }

            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (err) {
        res.send(err)
    }
})

const deleteCampaing = asyncHandler(async(req, res) => {
    try {
        const find = await User.findById(req.cookies._id)

        if (find) {
            const del = await User.findByIdAndUpdate(req.cookies._id, {
                $pull: {
                    campaings: {
                        id_campaing: req.params.id
                    }
                }
            })

            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (err) {
        res.sendStatus(500)
    }

    if (find.id_admin == "63f339ba64a838f6882aa2a8") {
        const historic = await Historic.create({"action": `Campanha excluída: ${name}`, "name": find.name, "id_user": find._id, "credits_sms": find.credits_sms, "credits_whatsapp": find.credits_whatsapp, "date": dataFormat, id_admin: "63f339ba64a838f6882aa2a8"})
    } else if (find.id_admin == "640b38d77ec66631a7b9380c") {
        const historic = await Historic.create({"action": `Campanha excluída: ${name}`, "name": find.name, "id_user": find._id, "credits_sms": find.credits_sms, "credits_whatsapp": find.credits_whatsapp, "date": dataFormat, id_admin: "640b38d77ec66631a7b9380c"})
    }
})

module.exports = {
    campaings,
    newCampaing,
    saveCampaing,
    deleteCampaing
}