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
    historic
} = require('../controllers/historic')

const {
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
} = require('../controllers/adminCtrl')

const {
    campaings,
    newCampaing,
    saveCampaing,
    deleteCampaing,
} = require('../controllers/newCampaing')

const { 
    dashboard,
    credits,
    logout
} = require('../controllers/platformCtrl')

const { 
    config,
} = require('../controllers/configAccountCtrl')

const { 
    contacts,
    newContact,
    delContact
} = require('../controllers/contacts');



// Dashboard
router.get("/", auth, dashboard)



// Campanhas
router.get("/campaings", auth, campaings)



// Nova campanha
router.get("/new", auth, newCampaing)
router.post("/new/add_campaing/", auth, saveCampaing)
router.delete("/campaings/delete/:id", auth, deleteCampaing)



// Importar contatos
router.get("/contacts", auth, contacts)
router.post("/contacts/new", auth, newContact)
router.delete("/contacts/delete/:id", auth, delContact)



// Historico
router.get("/historic", auth, historic)



// Créditos
router.get("/credits", auth, credits)



// Configurações da conta
router.get("/config", auth, config)



// Logout
router.get("/logout", auth, logout)



// Admin
router.get("/new_user", checkAdmin, newUser)
router.post("/new_user/save", checkAdmin, saveUser)
router.get("/users", checkAdmin, users)
router.get("/users/:id", checkAdmin, infoUser)
router.post("/users/update/:id", checkAdmin, updateUser)
router.get("/finance", checkAdmin, finance)
router.get("/all-historics", checkAdmin, historics)
router.post("/users/block/:id", checkAdmin, blockUser)
router.post("/users/unlock/:id", checkAdmin, unlockUser)
router.delete("/users/delete/:id", checkAdmin, deleteUser)

module.exports = router