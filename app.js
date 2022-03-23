var express=require("express");
var mongoose=require("mongoose");
var app=express();
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.set('views','./view');
require("dotenv").config();
const auth = require("./auth/auth");

var url="mongodb://0.0.0.0:27017/healthcare";
mongoose.connect(url,{useNewUrlParser:true});
const con=mongoose.connection;
con.on('open',function()
{
    console.log("db connected...");
});


app.get('/',(req,res)=>
{
    res.render('home',{msg:""});
});

const adminRouter=require('./controller/admin');
app.use('/admin',adminRouter);

const patientRouter=require('./controller/patient');
app.use('/patient',patientRouter);

const doctorRouter=require('./controller/doctor');
app.use('/doctor',doctorRouter);

app.listen(1234,()=>
{
    console.log("server is listening");
});
