const express=require("express")
const cors=require("cors");
const mysql=require("mysql")
const bodyParser=require("body-parser")
const multer=require("multer")
const path=require("path");
const app=express();
const routes=express.Router();
// var fs = require('fs');
module.exports={express,cors,mysql,bodyParser,multer,path,app,routes}