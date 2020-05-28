var express = require('express')
var router = express.Router()

// 注: 此处'/user' 前还有'/admin'
router.get('/user', function (req, res, next) {
    res.send('adminUser')
})

module.exports = router