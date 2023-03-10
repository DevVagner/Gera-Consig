const express = require('express')
const router = express.Router()

router.get("/", async(req, res) => {
    const plans = await Plans.find({})
    
    res.render('layouts/main', { plans: plans })
})

module.exports = router