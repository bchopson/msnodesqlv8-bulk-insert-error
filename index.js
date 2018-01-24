'use strict'
const mssql = require('mssql/msnodesqlv8')

const connectionString = `Driver=msnodesqlv8;Server=${process.env.DB_SERVER};Trusted_Connection=yes;`

mssql.connect(connectionString)
  .then(() => {
    const table = new mssql.Table('#table_name')
    table.create = true
    table.columns.add('a', mssql.Int, {primary: true})
    table.columns.add('b', mssql.VarChar(50), {nullable: false})
    table.rows.add(777, 'test')

    const request = new mssql.Request()
    return request.bulk(table)
  })
  .then(console.log)
  .catch((err) => {
    console.error(err)
  })
