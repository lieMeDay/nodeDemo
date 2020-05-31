// 引入数据库
var mongoose=require('mongoose')
// 用户表结构  models文件夹 ==> user.js 
module.exports= new mongoose.Schema({
    // 用户名
    userName:String,
    // 密码
    passWord:String,
    // 是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
})