const {app}=require("../../utils/import")
const review=(db_conn,path)=>{
    let reviewId,customerId,productId,reviewText,rating,reviewDate,request;
    let table='reviews'
    let select=`select * from ${table}`;
    let insert=`insert into ${table}(customerId,productId,reviewText,rating,reviewDate) values(?,?,?,?,?)`;
    let update=`update ${table} set reviewText=?,rating=?,reviewDat=? where reviewId=?`;
    let deletes=`delete ${table} where reviewId=?`;
    app.route((path)
    .get('/:id',(req,res)=>{
        reviewId=req.params['id'];
        if(reviewId){
            db_conn.query(`${select} where reviewId=${reviewId}`,(err,result)=> err ? err : res.json({result:result}))
        }
        else{
            db_conn.query(select,(err,result)=> err ? err : res.json({result:result}))
        }
        
    })
    .post((req,res)=>{
        request=req.body;
        customerId=request.customerId;
        productId=request.productId;
        reviewText=request.reviewText;
        rating=request.rating;
        reviewDate=request.reviewDate;
        db_conn.query(insert,[customerId,productId,reviewText,rating,reviewDate],(err,result)=>
            err ? res.json({message:"Review insert fail",ErrorMessage:err}) : res.json({result:result,message:"New review add successful",data:request})
        )

    })
    .put('/:id',(req,res)=>{
        request=req.body;
        reviewText=request.reviewText;
        rating=request.rating;
        reviewDate=request.reviewDate;
        reviewId=req.params['id'];
        db_conn.query(update,[reviewText,rating,reviewDate,reviewId],(err,result)=>
            err ? res.json({message:"Review update fail",ErrorMessage:err}) : res.json({result:result,message:"Review update successful",data:request})
        )
    })
    .delete('/:id',(req,res)=>{
        reviewId=req.params['id'];
        db_conn.query(deletes,[reviewId],(err,result)=>
        err ? res.json({message:"Review delete fail",ErrorMessage:err}) : res.json({result:result,message:"Review delete successful",data:reviewId}))
    })
    )
}
module.exports=review;