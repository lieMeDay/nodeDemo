// 引入数据库
var mongoose=require('mongoose')
// 内容表结构 
module.exports= new mongoose.Schema({
    // 关联字段 分类id
    category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'Category'
    },
    // 关联字段 用户id
    user:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'User'
    },
    addTime:{
        type:Date,
        default:new Date()
    },
    // 阅读量
    views:{
        type:Number,
        default:0
    },
    // 内容标题
    title:String,
    // 内容简介
    desc:{
        type:String,
        default:''
    },
    // 内容
    content:{
        type:String,
        default:''
    }
})