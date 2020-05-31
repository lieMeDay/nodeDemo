// 管理员访问
var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Category = require('../models/category')
var Content = require('../models/content')

// 注: 此处'/user' 前还有'/admin'
router.use(function (req, res, next) {
    // 如果当前用户为非管理员用户
    if (!req.userInfo.isAdmin) {
        res.send('您不是管理员')
        return
    }
    next()
})
// 首页
router.get('/', function (req, res, next) {
    res.render('admin/admin', {
        userInfo: req.userInfo
    })
})
// 用户管理
router.get('/user', function (req, res, next) {
    /**
     * 从数据库读取所有用户
     * limit(Number) 限制获取数据条数
     * 
     * skip(2) 忽略数据的条数
     * 例：每页2条
     * 1:1-2 skip(0)
     * 2:3-4 skip(2)
     */
    User.countDocuments().then(function (count) {
        var page = Number(req.query.page || 1)
        var limit = 5
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                limit: limit,
                pages: pages,
                page: page
            })
        })
    })
})
// 分类管理
router.get('/category', function (req, res, next) {
    Category.countDocuments().then(function (count) {
        var page = Number(req.query.page || 1)
        var limit = 5
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit

        /**
         * 1 升序
         * -1 降序
         */
        Category.find().sort({ _id: -1 }).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category', {
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                limit: limit,
                pages: pages,
                page: page
            })
        })
    })
})
// 添加分类
router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
})
// 分类保存
router.post('/category/add', function (req, res, next) {
    var name = req.body.name || ''
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            msg: '名称不能为空',
        })
        return
    }

    // 数据库是否已存在
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类已存在'
            })
            return Promise.reject()
        } else {
            return new Category({
                name: name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '保存成功',
            url: '/admin/category'
        })
    })
    // Category
})
// 分类修改
router.get('/category/edit', function (req, res, next) {
    // 获取修改分类信息
    var id = req.query.id
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类信息不存在',
            })
            return Promise.reject()
        } else {
            res.render('admin/categoryEdit', {
                userInfo: req.userInfo,
                category: category
            })
        }
    })
})

// 分类修改保存
router.post('/category/edit', function (req, res, next) {
    // 获取修改分类信息
    var id = req.query.id || ''
    var name = req.body.name || ''
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类信息不存在',
            })
            return Promise.reject()
        } else {
            // 名称是否修改
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    msg: '修改成功',
                    url: '/admin/category'
                })
                return Promise.reject()
            } else {
                // 修改的分类名称是否存在
                return Category.findOne({
                    _id: { $ne: id },
                    name: name
                })
            }
        }
    }).then(function (hasCategory) {
        if (hasCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '数据库已存在同名分类',
            })
            return Promise.reject()
        } else {
            return Category.updateOne({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '修改成功',
            url: '/admin/category'
        })
    })
})

// 分类删除
router.get('/category/delete', function (req, res, next) {
    var id = req.query.id || ''
    Category.deleteOne({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '删除成功',
            url: '/admin/category'
        })
    })
})

// 内容首页
router.get('/content', function (req, res, next) {

    Content.countDocuments().then(function (count) {
        var page = Number(req.query.page || 1)
        var limit = 5
        // 计算总页数
        pages = Math.ceil(count / limit)
        page = Math.min(page, pages)
        // 取值不能小于1
        page = Math.max(page, 1)

        var skip = (page - 1) * limit

        /**
         * 1 升序
         * -1 降序
         */
        Content.find().sort({ _id: -1 }).limit(limit).skip(skip).populate(['category','user']).then(function (contents) {
            res.render('admin/content', {
                userInfo: req.userInfo,
                contents: contents,
                count: count,
                limit: limit,
                pages: pages,
                page: page
            })
        })
    })
})

// 内容添加
router.get('/content/add', function (req, res, next) {
    Category.find().then(function (categories) {
        res.render('admin/contentAdd', {
            userInfo: req.userInfo,
            categories: categories
        })
    })
})

// 内容保存
router.post('/content/add', function (req, res, next) {
    if (req.body.category == '') {
        res.render("admin/error", {
            userInfo: userInfo,
            msg: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render("admin/error", {
            userInfo: userInfo,
            msg: '内容标题不能为空'
        })
        return
    }
    // 保存数据
    new Content({
        category: req.body.category,
        title: req.body.title,
        desc: req.body.description,
        content: req.body.content,
        user:req.userInfo.id,
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '内容保存成功',
            url: '/admin/content'
        })
    })
})

// 修改内容
router.get('/content/edit', function (req, res, next) {
    var id = req.query.id || ''
    var categories=[]
    Category.find().then(function (rs) {
        categories=rs
        return Content.findOne({
            _id: id
        }).populate('category')
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '内容不存在',
            })
            return Promise.reject()
        } else {
            res.render('admin/contentEdit', {
                userInfo: req.userInfo,
                categories:categories,
                content: content
            })
        }
    })
})
// 保存修改内容
router.post('/content/edit', function (req, res, next){
    var id = req.query.id || ''
    
    if (req.body.category == '') {
        res.render("admin/error", {
            userInfo: userInfo,
            msg: '内容分类不能为空'
        })
        return
    }
    if (req.body.title == '') {
        res.render("admin/error", {
            userInfo: userInfo,
            msg: '内容标题不能为空'
        })
        return
    }
    Content.findOne({
        _id: id
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '内容信息不存在',
            })
            return Promise.reject()
        } else {
            return Content.updateOne({
                _id: id
            }, {
                category: req.body.category,
                title: req.body.title,
                desc: req.body.description,
                content: req.body.content
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '内容修改成功',
            url: '/admin/content'
        })
    })
})

// 内容删除 
router.get('/content/delete', function (req, res, next){
    var id = req.query.id || ''
    Content.deleteOne({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '删除成功',
            url: '/admin/content'
        })
    })
})

module.exports = router