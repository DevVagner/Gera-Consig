const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const config = asyncHandler(async(req, res) => {
    const find = await User.findById(req.cookies._id)

    res.render('layouts/config', {isAdmin: find.isAdmin, user: find, name: find.name})
})

module.exports = 
{   
    config,
}