/*应用程序启动文件 */

// 加载express模块
var express=require('express')
// 加载模板处理模块
var swig=require('swig')
// 创建app应用 ==> app相当于 node.js  Http.createServer()
var app=express()

// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回对应的__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'))

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀,第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile)
// 设置模板文件存放的目录，第一个参数必须是 views,第二个参数是目录
app.set('views','./views')
// 注册所使用的模板引擎,第一个必须是 view engine ,第二个参数和view engine这个方法中定义的模板引擎名称（第一个参数）是一致的
app.set('view engine','html')
// 在开发过程中需要取消模板缓存 ，避免每次重启
swig.setDefaults({cache:false})


/**
 * 首页
 *  req request对象
 *  res respinse对象
 * next 函数
 */
app.get('/',function(req,res,next){
    // res.send('<h1>欢迎光临</h1>')

    /**
     * 
     * 读取views目录下的指定文件，解析并返回给客户端
     * 第一个参数：表示模板的文件，相对于views目录 views/index.html
     * 第二个参数：传递给模板所使用的数据
     */
    res.render('index')
})

// 监听http请求
app.listen(8081,'127.0.1.1')

/**
 * 总结
 *      用户发送http请求 ==> url -> 解析路由 ->找到匹配规则 -> 执行指定绑定函数，返回对应内容至用户
 * 
 * /public ->静态 (css,js) ->直接读取指定目录下的文件，返回给用户 (页面渲染 使html可以访问到css,js并执行)
 *     ==> app.use('/public',express.static(__dirname+'/public'))
 * 
 * -> 动态 -> 处理业务逻辑，加载模板，解析模板(加载html) ->返回数据给用户
 * app.get('url地址路径',function(req,res,next){res.render( 'index' ==》index.html)})
 * 
 */