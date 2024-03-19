const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    const userData = "Nirmal"

    res.json(userData);
})

module.exports = router