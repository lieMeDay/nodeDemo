/*应用程序启动文件 */

// 加载express模块
var express = require('express')
// 加载模板处理模块
var swig = require('swig')
// 加载数据库模块
var mongoose = require('mongoose')
// 创建app应用 ==> app相当于 node.js  Http.createServer()
var app = express()

// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回对应的__dirname+'/public'下的文件
app.use('/public', express.static(__dirname + '/public'))

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀,第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
// 设置模板文件存放的目录，第一个参数必须是 views,第二个参数是目录
app.set('views', './views')
// 注册所使用的模板引擎,第一个必须是 view engine ,第二个参数和view engine这个方法中定义的模板引擎名称（第一个参数）是一致的
app.set('view engine', 'html')
// 在开发过程中需要取消模板缓存 ，避免每次重启
swig.setDefaults({ cache: false })

// 根据不同功能划分模块
// 1=>路由 访问的路由以/admin开头的，处理当前文件夹下的admin.js 下同
app.use('/admin', require('./routers/admin'))  //处理后台管理路由
app.use('/api', require('./routers/api')) //处理api的 即接口
app.use('/', require('./routers/main')) //处理前端展示的

// 连接数据库  监听http请求
mongoose.connect('mongodb://localhost:27017/nodeDemo', function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
        // app.listen(9898, '127.0.1.1')
        app.listen(9898)
    }
})

