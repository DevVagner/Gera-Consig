const express = require('express')
const router = express.Router()

const {
    checkTypeAccount
} = require('../middlewares/newAccountFB')

const {
    checkAdmin,
} = require('../middlewares/admin')

const {
    auth
} = require('../middlewares/checkLogin')

const {
    pendings,
    users,
    newUser,
    saveUser,
    infoUser,
    updateUser,
    blockUser,
    unlockUser,
    deleteUser,
} = require('../controllers/adminCtrl')

const {
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
} = require('../controllers/genCtrl')

const { 
    dashboard,
    logout
} = require('../controllers/platformCtrl')

const { 
    config,
} = require('../controllers/configAccountCtrl')


// Dashboard
router.get("/", auth, dashboard)



// Novo lead

router.get("/inss_entrantes", auth, inss_entrantes)
router.get("/inss_tomadores", auth, inss_tomadores)
router.get("/siape", auth, siape)
router.get("/exercito", auth, exercito)
router.get("/marinha", auth, marinha)
router.get("/aeronautica", auth, aeronautica)
router.get("/governos", auth, governos)
router.get("/prefeituras", auth, prefeituras)
router.get("/consignado", auth, consignado)
router.get("/fgts", auth, fgts)

router.post("/save", auth, save)
router.delete("/delete/:id", auth, deleteLeads)



// Configurações da conta
router.get("/config", auth, config)



// Logout
router.get("/logout", auth, logout)



// Admin
router.get("/pendings", checkAdmin, pendings)
router.get("/new_user", checkAdmin, newUser)
router.post("/new_user/save", checkAdmin, saveUser)
router.get("/users", checkAdmin, users)
router.get("/users/:id", checkAdmin, infoUser)
router.post("/users/update/:id", checkAdmin, updateUser)
router.post("/users/block/:id", checkAdmin, blockUser)
router.post("/users/unlock/:id", checkAdmin, unlockUser)
router.delete("/users/delete/:id", checkAdmin, deleteUser)

module.exports = router