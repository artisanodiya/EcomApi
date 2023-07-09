const {mysql}=require("../utils/import")
const sql_conn=  mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"nursary"
    }
)

sql_conn.connect((err)=>{
    err ? console.log(`server connection failes ${err}`):console.log(`Connected to server`)
})
module.exports=sql_conn;