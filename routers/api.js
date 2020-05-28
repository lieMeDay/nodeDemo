var express = require('express')
var router = express.Router()

// 注: 此处'/user' 前还有'/api'
router.get('/user', function (req, res, next) {
    res.send('apiUser')
})

module.exports = router