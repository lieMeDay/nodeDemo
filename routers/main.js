var express = require('express')
var router = express.Router()

// 注: 此处'/user' 前还有'/api'
router.get('/', function (req, res, next) {
    res.send('mainUser')
})

module.exports = router