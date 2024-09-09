const router = require('koa-router')()
const { insertNote, findNoteListType, findNoteDetail } = require('../controllers/index.js')
const jwt = require('../utils/jwt.js')

router.get('/findNoteListByType', jwt.verify(), async (ctx) => {
  // 获取前端传递的 note_type, 去数据库中以该note_type字段 读取数据,返回给前端
  const { note_type } = ctx.request.query
  try {
    const res = await findNoteListType(note_type, ctx.userId)
    if (res.length) {
      ctx.body = {
        code: '8000',
        data: res,
        msg: '查询成功'
      }
      console.log('查询成功');
    } else {
      ctx.body = {
        code: '8000',
        data: 'success',
        msg: '当前分类下没有数据'
      }
    }
  } catch (e) {
    ctx.body = {
      code: '8005',
      data: e,
      msg: '服务器异常'
    }
  }
  // console.log(res);
})
router.get('/findNoteDetail', async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const res = await findNoteDetail(id)
    if (res.length) {
      ctx.body = {
        code: '8000',
        data: res,
        msg: '查询成功'
      }
      console.log(ctx);
      console.log('查询成功');
    } else {
      ctx.body = {
        code: '8000',
        data: 'success',
        msg: '当前分类下没有数据'
      }
    }
  } catch (e) {
    ctx.body = {
      code: '8005',
      data: e,
      msg: '服务器异常'
    }
  }
})

router.post('/note-publish', jwt.verify(), async (ctx) => {
  const { title, note_type, head_img, note_content, nickname } = ctx.request.body;
  const id = ctx.userId;
  const now = new Date()
  const m_time = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}`
  const c_time = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}`
  try {
    const res = await insertNote(id, title, note_type, note_content, 0, c_time, m_time, head_img, nickname)
    if (res.affectedRows) {
      ctx.body = {
        code: '8000',
        data: 'success',
        msg: '插入成功'
      }
      console.log('插入成功');
    } else {
      ctx.body = {
        code: '8000',
        data: 'error',
        msg: '插入失败'
      }
    }
  } catch (e) {
    ctx.body = {
      code: '8005',
      data: e,
      msg: '服务器异常'
    }
  }
})


module.exports = router