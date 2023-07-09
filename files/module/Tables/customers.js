const {app}=require("../../utils/import")
const customer=(db_conn,path)=>{
    let customerId,customerName,customerEmail,customerAddress,customerShippingAddress,customerbillingAddress,request;
    let table='customers'
    let select=`select * from ${table}`;
    let insert=`insert into ${table}(customerName,customerEmail,customerAddress,customerShippingAddress,customerbillingAddress) values(?,?,?,?,?)`;
    let update=`update ${table} set customerName=?,customerEmail=?,customerAddress=?,customerShippingAddress=?,customerbillingAddress=? where customerId=?`;
    let deletes=`delete from ${table} where customerId=?`;
    
    app.route(`${path}`)
    .get((req,res)=>{
        db_conn.query(select,(err,result)=> err ? err : res.json({result:result})) 
    })
    .post((req,res)=>{
        request=req.body;
        customerName=request.customerName;
        customerEmail=request.customerEmail;
        customerAddress=request.customerAddress;
        customerShippingAddress=request.customerShippingAddress;
        customerbillingAddress=request.customerbillingAddress;
        db_conn.query(insert,[customerName,customerEmail,customerAddress,customerShippingAddress,customerbillingAddress],(err,result)=>
            err ? res.json({message:"customer insert fail",ErrorMessage:err}) : res.json({result:result,message:"New customer add successful",data:request})
        )
    })
   
    app.route(`${path}/:id`)
    .get((req,res)=>{
        customerId=req.params['id'];
        db_conn.query(`${select} where customerId=${customerId}`,(err,result)=> err ? err : res.json({result:result}))
    })
    .put((req,res)=>{
        request=req.body;
        customerName=request.customerName;
        customerEmail=request.customerEmail;
        customerAddress=request.customerAddress;
        customerShippingAddress=request.customerShippingAddress;
        customerbillingAddress=request.customerbillingAddress;
        customerId=req.params['id'];
        db_conn.query(update,[customerName,customerEmail,customerAddress,customerShippingAddress,customerbillingAddress,customerId],(err,result)=>
            err ? res.json({message:"Customer update fail",ErrorMessage:err}) : res.json({result:result,message:"Customer update successful",data:request})
        )
    })
    .delete((req,res)=>{
        customerId=req.params['id'];
        db_conn.query(deletes,[customerId],(err,result)=>
        err ? res.json({message:"Customer delete fail",ErrorMessage:err}) : res.json({result:result,message:"Customer delete successful",data:customerId}))
    })
       
}
module.exports=customer;