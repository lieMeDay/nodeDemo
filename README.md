db ==>数据库存储目录
modules==>数据库模型文件目录
node_modules==>node第三方模块目录
public==>公共文件目录(css,js,image...)
routers==>路由文件目录
schemas==>数据库结构文件目录
views==>模板视图文件目录
app.js==>应用(启动)入口文件
package.json

```
/** day01
 * 总结
 *      用户发送http请求 ==> url -> 解析路由 ->找到匹配规则 -> 执行指定绑定函数，返回对应内容至用户
 * 
 * /public ->静态 (css,js) ->直接读取指定目录下的文件，返回给用户 (页面渲染 使html可以访问到css,js并执行)
 *     ==> app.use('/public',express.static(__dirname+'/public'))
 * 
 * -> 动态 -> 处理业务逻辑，加载模板，解析模板(加载html) ->返回数据给用户
 * app.get('url地址路径',function(req,res,next){res.render( 'index' ==》index.html)})
 * 
 * 请求request   响应response
 *
 *day02
 * // 根据不同功能划分模块
 * // 1=>路由 访问的路由以/admin开头的，处理当前文件夹下的admin.js 下同
 * app.use('/admin',require('./routers/admin'))  //处理后台管理路由
 * app.use('/api',require('./routers/api')) //处理api的 即接口
 * app.use('/',require('./routers/main')) //处理前端展示的
 *
 * mogondb ==>require('mongoose')
 * 启动===> bin ==>mongod --dbpath=E:\nodeDemo\db --port=27018
 *                  （当前存储目录） 当前项目db目录    (默认27017)
 *
 * 数据库的绑定
 *
 */
```