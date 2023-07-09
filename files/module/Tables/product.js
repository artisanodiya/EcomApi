
const {app}=require("../../utils/import")
const product=(db_conn,path)=>{
    let productId,categoryId,productName,productDescription,productPrice,productImg,productstatus,request;
    let table='products'
    let select=`select productName,productDescription,productPrice,productImg,productstatus,categoryName from ${table},categories where categories.categoryId=products.productId`;
    let insert=`insert into ${table}(categoryId,productName,productDescription,productPrice,productImg,productstatus) values(?,?,?,?,?,?)`;
    let update=`update ${table} set categoryId=?,productName=?,productDescription=?,productPrice=?,productImg=?,productstatus=? where productId=?`;
    let deletes=`delete from ${table} where productId=?`;
    
    app.route(`${path}`)
    .get((req,res)=>{
        db_conn.query(select,(err,result)=> err ? err : res.json({result:result})) 
    })
    .post((req,res)=>{
        request=req.body;
        categoryId=request.categoryId;
        productName=request.productName;
        productDescription=request.productDescription;
        productPrice=request.productPrice;
        productImg=request.productImg;
        productstatus=request.productstatus;
        db_conn.query(insert,[categoryId,productName,productDescription,productPrice,productImg,productstatus],(err,result)=>
            err ? res.json({message:"Product insert fail",ErrorMessage:err}) : res.json({result:result,message:"New Product add successful",data:request})
        )
    })
   
    app.route(`${path}/:id`)
    .get((req,res)=>{
        productId=req.params['id'];
        db_conn.query(`${select} and productId=${productId}`,(err,result)=> err ? err : res.json({result:result}))
    })
    .put((req,res)=>{
        request=req.body;
        categoryId=request.categoryId;
        productName=request.productName;
        productDescription=request.productDescription;
        productPrice=request.productPrice;
        productImg=request.productImg;
        productstatus=request.productstatus;
        productId=req.params['id'];
        db_conn.query(update,[categoryId,productName,productDescription,productPrice,productImg,productstatus,productId],(err,result)=>
            err ? res.json({message:"Product update fail",ErrorMessage:err}) : res.json({result:result,message:"Product update successful",data:request})
        )
    })
    .delete((req,res)=>{
        productId=req.params['id'];
        db_conn.query(deletes,[productId],(err,result)=>
        err ? res.json({message:"Product delete fail",ErrorMessage:err}) : res.json({result:result,message:"Product delete successful",data:productId}))
    })
       
}
module.exports=product;