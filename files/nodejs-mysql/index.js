const koa = require('koa')
const Router = require('koa-router')
const mysql = require('mysql')

const app = new koa()
const router = new Router()

// 链接mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    // 已经创建 mysqlkoa 数据库
    database: 'mysqlkoa'
})

// 判断链接状态
connection.connect(err=> {
    if(err) throw err
    console.log('mysql connected success!')
})

// 设置路由
router.get('/', ctx => {
    ctx.body = 'from index.js'
})

// 设置路由 并 创建数据库 mysqlkoa edit mysql
// router.get('/createdb', ctx => {
//     return new Promise(resolve => {
//         const sql = `CREATE DATABASE mysqlkoa`

//         connection.query(sql, err=> {
//             if(err) throw err
//             ctx.body = {
//                 code: 200,
//                 msg: `create database mysqlkoa success !`
//             }
//             resolve()
//         })
//     })
// })

// 在已经创建 mysqlkoa 数据库的情况下 新建表
// router.get('/createtable', ctx => {
//     return new Promise(resolve => {
//         const sql = `CREATE TABLE f2_frame(
//             id INT(11) AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255),
//             author VARCHAR(255)
//         )`
//         connection.query(sql, (err, results, filelds) => {
//             if(err) throw err
//             ctx.body = {
//                 code: 200,
//                 msg: `create table of f2_frame in mysqlkoa success !`
//             }
//             resolve()
//         })
//     })
// })

// 在f2_frame表中插入数据
// router.get('/insert', ctx => {
//     return new Promise(resolve => {
//         const sql = `INSERT INTO f2_frame(name, author)
//         VALUES('vue', 'Evan')`
//         connection.query(sql, err=> {
//             if(err) throw err
//             ctx.body = {
//                 code: 200,
//                 msg: `insert data to f2_frame success !`
//             }
//             resolve()
//         })
//     })
// })

// 插入多条数据
// router.get('/insertmulti', ctx => {
//     return new Promise(resolve => {
//       const sql = `INSERT INTO f2_frame(name, author)
//       VALUES ?`;
//       const values = [
//         ['React', 'Facebook'],
//         ['Angular', 'Google'],
//         ['jQuery', 'John Resig']
//       ];
//       connection.query(sql, [values], (err, result) => {
//         if (err) throw err;
//         ctx.body = {
//           code: 200,
//           msg: `insert ${result.affectedRows} data to f2_frame success!`
//         }
//         resolve();
//       })
//     })
//   })

// 删除 数据
// router.get('/delete', ctx=> {
//     return new Promise(resolve => {
//         const name = ctx.query.name
//         const sql = `DELETE FROM f2_frame WHERE name = '${name}'`
//         connection.query(sql, (err, result)=> {
//             if (err) throw err
//             ctx.body = {
//                 code: 200,
//                 msg: `delete ${result.affectedRows} data from f2_frame success !`
//             }
//             resolve()
//         })
//     })
// })

// 修改数据
// router.get('/update', ctx=> {
//     return new Promise(resolve => {
//         const sql = `UPDATE f2_frame SET author = 'Evan You' WHERE NAME = 'vue'`
//         connection.query(sql, (err, result) => {
//             if(err) throw err
//             ctx.body = {
//                 code: 200,
//                 msg: `update ${result.affectedRows} data from f2_frame success !`
//             }
//             resolve()
//         })
//     })
// })

// 查找数据
router.get('/select', ctx => {
    return new Promise(resolve => {
        let name = ctx.query.name
        const sql = `SELECT * FROM f2_frame WHERE name = '${name}'`
        connection.query(sql, (err, result)=> {
            if(err) throw err
            ctx.body = {
                code: 200,
                data: result
            }
            resolve()
        })
    })
})


// 
app.use(router.routes())

app.listen(3000)