const user=require("../module/Tables/user");
const customer=require("../module/Tables/customers")
const product=require("../module/Tables/product")
const category=require("../module/Tables/category")
const sql_conn=require("../database/sqlConnection")
module.exports={sql_conn,user,customer,category,product}