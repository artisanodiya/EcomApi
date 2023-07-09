const {app}=require("../../utils/import")

const user=(db_conn,path)=>{
    let user_id,user_name,user_email,user_password;
    const select=`select * from user`;
    const insert=`insert into user(user_name,emailId,password) values(?,?,?)`;
    const update=`update user set user_name=? where user_id=2`;
    const delete_query=`delete from user where user_id=1`;
    app.route(path)
        .get((req,res)=>{
            db_conn.query(select,(err,result)=> err ? err : res.json({Result:result}))
        })
        .post((req,res)=>{
            user_id=req.body.user_id;
            user_name=req.body.user_namme;
            user_email=req.body.user_email;
            user_password=req.body.user_password;
            const data=req.body;
            db_conn.query(insert,[user_name,user_email,user_password],(err,result)=>err ? res.json({Message:"User Insert fail",ErrorMessage:err}) : res.json({result:result,Message:"User insert successfully",Data:data}))
        })
        .put((req,res)=>{
            db_conn.query(update,['atio'],(err,result)=>err ? err : res.json(result))
        })
        .delete((req,res)=>{
            sql_conn.query(delete_query,(err,result)=>err ?  err : res.json(result))
        })
}
module.exports=user;
