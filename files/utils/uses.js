const {app,bodyParser,express,cors}= require("./import")
const uses=()=>{
    app.use(cors())
    app.use(express.json())
    const port=process.env.PORT||7020
    app.listen(port,()=>(console.log(`Server start ${port}`)))
}
module.exports=uses;