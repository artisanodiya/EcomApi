const {app}=require("../../utils/import")
const order=()=>{
    let orderId,customerId,productId,quantity,totalPrice,orderDate,request;
    let table='orders'
    let select=`select * from ${table}`;
    let insert=`insert into ${table}(customerId,productId,quantity,totalPrice,orderDate) values(?,?,?,?,?)`;
    let update=`update ${table} set quantity=?,totalPrice=?,orderDate=? where orderId=?`;
    let deletes=`delete from ${table} where orderId=?`;
    
    app.route(`${path}`)
    .get((req,res)=>{
        db_conn.query(select,(err,result)=> err ? err : res.json({result:result})) 
    })
    .post((req,res)=>{
        request=req.body;
        customerId=request.customerId;
        productId=request.productId;
        quantity=request.quantity;
        totalPrice=request.totalPrice;
        orderDate=request.orderDate;
        db_conn.query(insert,[customerId,productId,quantity,totalPrice,orderDate],(err,result)=>
            err ? res.json({message:"Order fail",ErrorMessage:err}) : res.json({result:result,message:"New order add successful",data:request})
        )
    })
   
    app.route(`${path}/:id`)
    .get((req,res)=>{
        orderId=req.params['id'];
        db_conn.query(`${select} where orderId=${orderId}`,(err,result)=> err ? err : res.json({result:result}))
    })
    .put((req,res)=>{
        request=req.body;
        quantity=request.quantity;
        totalPrice=request.totalPrice;
        orderDate=request.orderDate;
        orderId=req.params['id'];
        db_conn.query(update,[quantity,totalPrice,orderDate,orderId],(err,result)=>
            err ? res.json({message:"Order update fail",ErrorMessage:err}) : res.json({result:result,message:"Order update successful",data:request})
        )
    })
    .delete((req,res)=>{
        orderId=req.params['id'];
        db_conn.query(deletes,[orderId],(err,result)=>
        err ? res.json({message:"Order delete fail",ErrorMessage:err}) : res.json({result:result,message:"Order delete successful",data:orderId}))
    })
       
}
module.export=order;