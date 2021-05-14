// Initializing environment variables
require('dotenv').config({path: __dirname + '/.env'})

var express = require('express')
var app = express()
const multer = require("multer")
const fs = require('fs')

var num = String(process.env.PHONE)
//Functions 

// var { send_sms } = require('./sms'); // Comment out this line  send_sms1
// Multer storage setup
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.exists(`./database/${req.body.type}/${req.body.name}`, (exist) => {
      console.log(exist)
      if (!exist) {
    return fs.mkdir(`./database/${req.body.type}/${req.body.name}`, (error) =>{
      console.log(error)
      console.log("Directory made")
      return cb(null, `./database/${req.body.type}/${req.body.name}`)
    })
  }
  return cb(null, `./database/${req.body.type}/${req.body.name}`)
  })
  },
  filename: function (req, file, cb) {
    if(req.body.type == "images"){
        cb(null, `${new Date()}.png`)
    }else if(req.body.type == 'videos'){
        cb(null, `${new Date()}.webm`)
    }
  }
})
var upload = multer({ storage: storage})

//Url and JSON Parsers
var bodyParser = require('body-parser')
var urlparse = bodyParser.urlencoded({limit:'50mb',extended:true})
var jsonparse = bodyParser.json({limit:'50mb'})


app.use(urlparse)
app.use(jsonparse)
//Static files
app.use('/static',express.static(__dirname+'/Static'))

//Routes 
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/Home/Index.html')
})

app.post("/detection",upload.single('image'),(req,res)=>{
//  if(req.body.type == "images") send_sms("Face detected",num) //Comment out this line  send_sms2
  res.redirect('back')
})


app.listen(process.env.PORT || 3000)
