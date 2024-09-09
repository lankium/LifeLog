const router = require('koa-router')()
const jwt = require('../utils/jwt.js')
const { userLogin, userRegister, userFind } = require('../controllers/index.js')
router.prefix('/user') // 路由前缀

// 登录
router.post('/login', async (ctx) => {
  // 获取到前端传递的账号密码，去数据库中校验
  const { username, password } = ctx.request.body;
  try {
    // 去数据库校验
    const result = await userLogin(username, password)
    if (result.length) {
      let data = {
        id: result[0].id,
        nickname: result[0].nickname,
        username: result[0].username
      }
      // 生成token 
      let token = jwt.sign({ id: result[0].id, username: result[0].username, admin: true })
      ctx.body = {
        code: '8000',
        data: data,
        msg: '登录成功',
        token: token
      }
    } else {
      ctx.body = {
        code: '8004',
        data: 'error',
        msg: '用户名或密码错误'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '8005',
      data: error,
      msg: '服务器异常'
    }
  }
})

// 注册
router.post('/register', async (ctx) => {
  const { username, password, nickname } = ctx.request.body;
  if (!username || !password || !nickname) {
    ctx.body = {
      code: '8001',
      msg: '账号密码或昵称不能为空'
    }
    return
  }
  try {
    const findRes = await userFind(username)
    if (findRes.length) {
      ctx.body = {
        code: '8002',
        data: 'error',
        msg: '用户名已存在'
      }
      return
    }
    const registerRes = await userRegister(username, password, nickname)
    if (registerRes.affectedRows) {
      ctx.body = {
        code: '8000',
        data: 'success',
        msg: '插入成功'
      }
    } else {
      ctx.body = {
        code: '8004',
        data: 'error',
        msg: '插入失败'
      }
    }
  } catch (error) {
    ctx.body = {
      code: '8005',
      data: error,
      msg: '服务器异常'
    }
  }

})

// 测试token
router.post('/home', jwt.verify(), (ctx) => {
  ctx.body = {
    code: '8000',
    data: '首页数据'
  }
})

module.exports = router