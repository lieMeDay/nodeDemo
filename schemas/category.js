// 引入数据库
var mongoose=require('mongoose')
// 分类表结构 
module.exports= new mongoose.Schema({
    // 分类名称
    name:String,
})