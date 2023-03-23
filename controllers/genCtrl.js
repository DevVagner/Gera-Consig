const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Historic = require('../models/Historic')

async function code() {
    const length = 40;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let id = '';

    for (let i = 0; i < length; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return String(id);
}

async function validCode() {
    while (true) {
        const id = await code()
        const findCode = await User.find({})
        let find = false

        findCode.forEach((user) => {
            user.pendings.forEach((pending) => {
                if (findCode == pending.id) {
                    find = true
                }
            })
        })

        if (find) {
            continue
        } else {
            return id;
        }
    }
}

const inss_entrantes = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/inss_entrantes', {isAdmin: find.isAdmin, name: find.name})
})

const inss_tomadores = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/inss_tomadores', {isAdmin: find.isAdmin, name: find.name})
})

const siape = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/siape', {isAdmin: find.isAdmin, name: find.name})
})

const exercito = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/exercito', {isAdmin: find.isAdmin, name: find.name})
})

const marinha = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/marinha', {isAdmin: find.isAdmin, name: find.name})
})

const aeronautica = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/aeronautica', {isAdmin: find.isAdmin, name: find.name})
})

const governos = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/governos', {isAdmin: find.isAdmin, name: find.name})
})

const prefeituras = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/prefeituras', {isAdmin: find.isAdmin, name: find.name})
})

const consignado = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/consignado', {isAdmin: find.isAdmin, name: find.name})
})

const fgts = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/fgts', {isAdmin: find.isAdmin, name: find.name})
})

const save = asyncHandler(async(req, res) => {
    try {
        const { name, uf, city, age_min, age_max, margin_min, margin_max, species, month_year, banks, cnpj, balance_min, balance_max, type } = req.body

        const data = Date.now();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formater = new Intl.DateTimeFormat('pt-BR', options);
        const dataFormat = formater.format(data);

        const findUser = await User.findById(req.cookies._id)

        if (findUser) {
            const id = await validCode()

            if (type == "inss_entrantes") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "species": species,
                            "month_year": month_year,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "inss_tomadores") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "species": species,
                            "banks": banks,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "siape") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "banks": banks,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "exercito") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "banks": banks,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "marinha") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "banks": banks,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "aeronautica") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "margin_min": margin_min,
                            "margin_max": margin_max,
                            "banks": banks,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "governos") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "prefeituras") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "consignado") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "cnpj": cnpj,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });    
            } else if (type == "fgts") {
                User.findOneAndUpdate({
                    _id: req.cookies._id
                }, {
                    $push: {
                        "pendings": {
                            "id": id,
                            "name": name,
                            "uf": uf,
                            "city": city,
                            "age_min": age_min,
                            "age_max": age_max,
                            "balance_min": balance_min,
                            "balance_max": balance_max,
                            "type": type,
                            "status": "pending",
                            "date": dataFormat,
                            "link": ""
                        }
                    }
                }, (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.send("Erro");
                    }
                });  
            }
            
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

const deleteLeads = asyncHandler(async(req, res) => {
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
    inss_entrantes,
    inss_tomadores,
    siape,
    exercito,
    marinha,
    aeronautica,
    governos,
    prefeituras,
    consignado,
    fgts,
    save,
    deleteLeads,
}