// // /home/webgile/Desktop/arti_files/R/manage/server/public
// const storage = multer.diskStorage({
//     // destination: path.join(__dirname, '../public_html/', 'uploads'),
//     destination: (req,res,cb)=>{
//       cb(null,'public')
//     },
//     filename: function (req, file, cb) {   
//         // null as first argument means no error
//         cb(null, Date.now() + '-' + file.originalname )  
//     }
// })
// const upload = multer({ storage: storage}).single('file');
// app.post("/up",(req,res)=>{
//     upload(req,res,(err)=>{
//     //   if (!req.file) {
//     //     return res.send('Please select an image to upload');
//     // }
//     // else if (err instanceof multer.MulterError) {
//     //     return res.send(err);
//     // }
//     // else if (err) {
//     //     return res.send(err);
//     // }
//       if(err){
//         res.status(500).json(err);
//       }
//       else{
        
//         const classifiedsadd = {
//           image: req.file.filename
//         };
//               const sql = "INSERT INTO users SET ?";
//               db_con.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
//           res.json({ success: 1 })      
      
//         });}
//     })
//   })
