const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Historic = require('../models/Historic')

const dashboard = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/dashboard', {isAdmin: find.isAdmin, pendings: find.pendings, name: find.name})
})

const logout = asyncHandler(async(req, res) => {
    res.cookie('_id', '', { expires: new Date(0) })
    res.redirect("/login")
})

module.exports = 
{   dashboard,
    logout
}