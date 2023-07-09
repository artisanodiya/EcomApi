const {database,user,sql_conn,customer,category,product}=require("./files/utils/files")
const {app,cors,bodyParser,express} =require("./files/utils/import")
    app.use(cors())
    app.use(express.json())
    const port=process.env.PORT||7020;
    //user(sql_conn,"/user");
    customer(sql_conn,"/customer");
    category(sql_conn,"/category");
    product(sql_conn,"/product");


app.listen(port,()=>(console.log(`Server start ${port}`)))