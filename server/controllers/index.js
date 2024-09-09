// 封装一个函数用来连接数据库
const mysql = require('mysql2/promise');
const config = require('../config/index.js')
// 线程池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

const allServices = {
  async query(sql, values) {
    try {
      // 通过线程池连接mysql
      const conn = await pool.getConnection();
      // 对连接执行某些操作
      const [rows, fields] = await conn.query(sql, values)
      pool.releaseConnection(conn);
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
// 登录
const userLogin = (username, password) => {
  let _sql = `select * from users where username="${username}" and password="${password}";`
  return allServices.query(_sql)
}
// 查找账号
const userFind = (username) => {
  let _sql = `select * from users where username="${username}";`
  return allServices.query(_sql)
}
// 注册
const userRegister = (username, password, nickname) => {
  let _sql = `insert into users(username,password,nickname) values('${username}', '${password}', '${nickname}')`
  return allServices.query(_sql)
}
// 根据分类查找笔记
const findNoteListType = (note_type, userId) => {
  let _sql = `select * from note where note_type="${note_type}" and userId="${userId}";`
  return allServices.query(_sql)
}
// 根据ID查找详情
const findNoteDetail = (id) => {
  let _sql = `select * from note where id="${id}";`
  return allServices.query(_sql)
}
// 插入note数据
const insertNote = (id, title, note_type, note_content, is_collection, c_time, m_time, head_img, nickname) => {
  let _sql = `insert into note(userId,title,note_type,note_content,is_collection,c_time,m_time,head_img,collection_id,nickname) values('${id}', '${title}', '${note_type}','${note_content}','${is_collection}','${c_time}','${m_time}','${head_img}',NULL,'${nickname}')`
  return allServices.query(_sql)
}
module.exports = {
  userLogin,
  userRegister,
  userFind,
  findNoteListType,
  findNoteDetail,
  insertNote
}