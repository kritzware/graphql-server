const mysql = require('mysql')

const { host, user, password, database } = require('./config')

const connection = mysql.createConnection({
  host,
  user,
  password,
  database
})

connection.connect()

module.exports = {

  async qry(sql_str, ...args) {
    return new Promise((resolve, reject) => {
      connection.query(sql_str, ...args, (err, res, fields) => {
        if(err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

}