const {app}=require("../../utils/import")
const category=(db_conn,path)=>{
    let categoryId,categoryName,category_slug,categoryImg;
    let table='categories'
    let select=`select * from ${table}`;
    let insert=`insert into ${table}(categoryName,category_slug,categoryImg) values(?,?,?)`;
    let update=`update ${table} set categoryName=?,category_slug=?,categoryImg=? where categoryId=?`;
    let deletes=`delete from ${table} where categoryId=?`;
    
    app.route(`${path}`)
    .get((req,res)=>{
        db_conn.query(select,(err,result)=> err ? err : res.json({result:result})) 
    })
    .post((req,res)=>{
        request=req.body;
        categoryName=request.categoryName;
        category_slug=request.category_slug;
        categoryImg=request.categoryImg;
        db_conn.query(insert,[categoryName,category_slug,categoryImg],(err,result)=>
            err ? res.json({message:"Categories add fail",ErrorMessage:err}) : res.json({result:result,message:"New Categories add successful",data:request})
        )
    })
   
    app.route(`${path}/:id`)
    .get((req,res)=>{
        categoryId=req.params['id'];
        db_conn.query(`${select} where categoryId=${categoryId}`,(err,result)=> err ? err : res.json({result:result}))
    })
    .put((req,res)=>{
        request=req.body;
        categoryName=request.categoryName;
        category_slug=request.category_slug;
        categoryImg=request.categoryImg;
        categoryId=req.params['id'];
        db_conn.query(update,[categoryName,category_slug,categoryImg,categoryId],(err,result)=>
            err ? res.json({message:"Categories update fail",ErrorMessage:err}) : res.json({result:result,message:"Categories update successful",data:request})
        )
    })
    .delete((req,res)=>{
        categoryId=req.params['id'];
        db_conn.query(deletes,[categoryId],(err,result)=>
        err ? res.json({message:"Categories delete fail",ErrorMessage:err}) : res.json({result:result,message:"Categories delete successful",data:categoryId}))
    })
       
}
module.exports=category;