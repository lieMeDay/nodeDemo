// 接口调用文件
var express = require('express')
var router = express.Router()
var User = require('../models/user') //返回一个构造函数 中对象为数据

// 统一返回格式 接口调用返回的东西 格式
var responseDate

router.use(function (req, res, next) {
    responseDate = {
        code: 200,
        message: ''
    }
    next()
})


// 注: 此处'/user' 前还有'/api'
// 用户注册
router.post('/user/register', function (req, res, next) {
    var userName = req.body.userName
    var passWord = req.body.passWord
    // 为空==》案例 ，判断已写在页面
    // 账号为空
    if (userName == '') {
        responseDate.code = 1
        responseDate.message = '账号不能为空'
        res.json(responseDate)
        return
    }
    // 密码为空
    if (passWord == '') {
        responseDate.code = 2
        responseDate.message = '密码不能为空'
        res.json(responseDate)
        return
    }

    // 用户是否已经被注册，查询数据库同名判断
    User.findOne({
        userName: userName
    }).then(function (userInfo) {
        if (userInfo) {
            //表示用户名已注册
            responseDate.code = 3
            responseDate.message = '用户名已注册'
            res.json(responseDate)
            return
        }
        var user = new User({
            userName: userName,
            passWord: passWord
        })
        return user.save()
    }).then(function (newUserInfo) {
        responseDate.message = '注册成功'
        responseDate.data = {
            id: newUserInfo.id,
            userName: newUserInfo.userName
        }
        req.cookies.set('userInfo', JSON.stringify(responseDate.data))
        res.json(responseDate)
    })
})
// 登录
router.get('/user/login', function (req, res, next) {
    var userName = req.query.userName
    var passWord = req.query.passWord
    // 查询数据库账号密码是否存在
    User.findOne({
        userName: userName,
        passWord: passWord
    }).then(function (userInfo) {
        if (!userInfo) {
            responseDate.code = 2
            responseDate.message = '用户名或密码错误'
            res.json(responseDate)
            return
        }
        // 输入正确 登录成功
        responseDate.message = '登录成功'
        responseDate.data = {
            id: userInfo.id,
            userName: userInfo.userName
        }
        req.cookies.set('userInfo', JSON.stringify(responseDate.data))
        res.json(responseDate)
        return
    })
})
// 退出登录
router.get('/user/logout', function (req, res, next) {
    req.cookies.set('userInfo', null)
    responseDate.message='退出成功'
    res.json(responseDate)
    return
})

module.exports = router