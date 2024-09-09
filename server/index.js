const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser')

const userRouter = require('./router/user.js')
const noteRouter = require('./router/note.js')

app.use(cors()) // 告诉浏览器不要破坏我的响应
app.use(bodyParser()) // 辅助koa解析post传递的参数

app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(noteRouter.routes(), noteRouter.allowedMethods())

app.listen(3000, () => {
  console.log('项目已启动');
})