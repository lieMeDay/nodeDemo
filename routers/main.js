// 页面路径 页面显示
var express = require('express')
var router = express.Router()

var Category=require('../models/category')
var Content=require('../models/content')

router.get('/', function (req, res, next) {
    Category.find().then(function(categories){
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        })
    })
})

router.get('/list', function (req, res, next) {
    // 获取所有分类
    Category.find().then(function(categories){
        var categoryId=req.query.id
        if(!categoryId){
            categoryId=categories[0]._id
        }
        // 获取所选分类内容
        Content.find({
            category:categoryId 
        }).populate(['category','user']).then(function(contents){
            res.render('main/list',{
                userInfo:req.userInfo,
                categoryId:categoryId,
                categories:categories,
                contents:contents,
            })
        })
    })

})
router.get('/content', function (req, res, next) {
    // 获取所有分类
    Category.find().then(function(categories){
        var categoryId=req.query.id
        if(!categoryId){
            categoryId=categories[0]._id
        }
        // 获取所选分类内容
        Content.find({
            category:categoryId 
        }).populate(['category','user']).then(function(contents){
            res.render('main/content',{
                userInfo:req.userInfo,
                categoryId:categoryId,
                categories:categories,
                contents:contents,
            })
        })
    })

})
module.exports = router