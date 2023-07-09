const {app}=require("../../utils/import")
const cart=(db_conn,path)=>{
    let cartId,customerId,productId,quantity,cartDate;
    let table='carts'
    let select=`select * from ${table}`;
    let insert=`insert into ${table}(customerId,productId,quantity,cartDate) values(?,?,?,?)`;
    let update=`update ${table} set quantity=?,cartDate=? where cartId=?`;
    let deletes=`delete from ${table} where cartId=?`;
    
    app.route(`${path}`)
    .get((req,res)=>{
        db_conn.query(select,(err,result)=> err ? err : res.json({result:result})) 
    })
    .post((req,res)=>{
        request=req.body;
        customerId=request.customerId;
        productId=request.productId;
        quantity=request.quantity;
        cartDate=request.cartDate;
        db_conn.query(insert,[customerId,productId,quantity,cartDate],(err,result)=>
            err ? res.json({message:"Cart item insert fail",ErrorMessage:err}) : res.json({result:result,message:"New Cart item add successful",data:request})
        )
    })
   
    app.route(`${path}/:id`)
    .get((req,res)=>{
        cartId=req.params['id'];
        db_conn.query(`${select} where cartId=${cartId}`,(err,result)=> err ? err : res.json({result:result}))
    })
    .put((req,res)=>{
        quantity=request.quantity;
        cartDate=request.cartDate;
        cartId=req.params['id'];
        db_conn.query(update,[quantity,cartDate,cartId],(err,result)=>
            err ? res.json({message:"Cart item update fail",ErrorMessage:err}) : res.json({result:result,message:"Cart item update successful",data:request})
        )
    })
    .delete((req,res)=>{
        cartId=req.params['id'];
        db_conn.query(deletes,[cartId],(err,result)=>
        err ? res.json({message:"Cart item delete fail",ErrorMessage:err}) : res.json({result:result,message:"Cart item delete successful",data:cartId}))
    })
       
}
module.exports=cart;