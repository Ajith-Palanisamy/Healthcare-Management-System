const express=require("express");
const router=express.Router();
const admin=require('../model/admindb');
const special=require('../model/specialdb');
const patient=require('../model/patientdb');
const doctor=require('../model/doctordb');
const appointment=require('../model/appointmentdb');
const auth = require("../auth/auth");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
var nodemailer = require('nodemailer');

router.get('/register',async(req,res)=>
{
    try{
        res.render("patient/register2",{obj:{},msg:""});
    }
    catch(err)
    { 
        res.send(err);
    }
});

router.use('/patient_login',(req,res)=>
{
    res.render('patient/patient_login',{msg:"",emailErr:"",pwdErr:"",email:"",pwd:""});
});

router.post('/registerValidate',async(req,res)=>
{
    try{
        var obj=new patient({
            name:req.body.name,
            city:req.body.city,
            contact:req.body.contact,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            pwd:req.body.pwd
        });
        const result=await patient.find({email:`${req.body.email}`});
        if(result.length==0)
        {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'healthcaremanagementsystem123@gmail.com',
                  pass: '9842325889'
                }
              });
              
              var mailOptions = {
                from: 'Admin',
                to: req.body.email,
                subject: 'Welcome to HMS',
                html: `<p>Dear ${req.body.name},</p><p>You have successfully registered into Healthcare Management System</p>
                <form action="http://localhost:1234/patient/login_email" method="post">
                <input type="hidden" name="name" value='${req.body.name}'>
                <input type="hidden" name="city" value='${req.body.city}'>
                <input type="hidden" name="contact" value='${req.body.contact}'>
                <input type="hidden" name="age" value='${req.body.age}'>
                <input type="hidden" name="gender" value='${req.body.gender}'>
                <input type="hidden" name="email" value='${req.body.email}'>
                <input type="hidden" name="pwd" value='${req.body.pwd}'>

                <p>Click the link to activate : </p>
                <input type="submit" value="Activate">
                </form>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
                
              });
            //console.log(obj);
            res.render('patient/patient_login2',{obj:obj});
        }
        else
        {
            //console.log(obj);
            res.render('patient/register2',{msg:"User with this Email is already Exist",obj:obj});
        }
    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/login_email',async(req,res)=>
{
    try{
        var obj=new patient({
            name:req.body.name,
            city:req.body.city,
            contact:req.body.contact,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            pwd:req.body.pwd
        });
            var encrypted=await bcrypt.hash(req.body.pwd,10);
            obj.pwd=encrypted;
            await obj.save();
            //console.log(obj);
            var id=obj._id;
            var email=obj.email;
            //console.log(id);
            const token = jwt.sign(
                {email,id},
                process.env.TOC,
                {
                  expiresIn: "2h",
                }
              );
            res.render('patient/dashboard',{user:obj,token:token});
        
    }
    catch(err)
    {
        res.send(err);
    }
    
});

router.post('/login',async(req,res)=>
{
    try{
        var {email,pwd}=req.body;
        const obj=await patient.findOne({email:`${email}`});
        if(obj!=null && await bcrypt.compare(pwd, obj.pwd) )
        {
            var id=obj._id;
            const token = jwt.sign(
                {email,id},
                process.env.TOC,
                {
                  expiresIn: "2h",
                }
              );
            res.render('patient/dashboard',{user:obj,token:token});
        }
        else if(obj!=null)
        {
            console.log("Err1");
           res.render('patient/patient_login',{msg:"",emailErr:"",pwdErr:"Incorrect Password",email:email,pwd:pwd});
        }
        else
        {
            console.log("Err3");
            res.render('patient/patient_login',{msg:"",emailErr:"User with this email does not exist",pwdErr:"",email:email,pwd:pwd});
        }
    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/dashboard',auth,async(req,res)=>
{
    var token=req.query.token;
    var obj=await patient.findOne({_id:req.query.id});
    res.render('patient/dashboard',{user:obj,token:token});
});

var date=new Date();
        var day=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        var hour=date.getHours();
        if(m<10)m="0"+m;
        if(day<10)day="0"+day;
        var today=y+"-"+m+"-"+day; 

router.get('/makeAppointment',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.userid);
        const spec=await special.find().sort({spc:1});
        const doc=await doctor.find().sort({spc:1,name:1});
        res.render('patient/makeAppointment',{user:obj,spec:spec,today:today,hour:hour,doc:doc,msg:"",t1:"",t2:"",token:token});

    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/addAppointment',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var a=await patient.findOne({_id:req.query.id});
        var b=await doctor.findOne({$and:[{name:`${req.body.dname}`},{spc:`${req.body.spc}`}]});
        var d=req.body.date;
        var c=await appointment.find({$and:[{dname:`${req.body.dname}`},{date:`${req.body.date}`}]});
        var i=c.length;
        var obj=new appointment({
            pname:a.name,
            p_id:a._id,
            dname:b.name,
            d_id:b._id,
            spc:b.spc,
            fee:b.fee,
            date:d,
            tokenNo:i+1
        });
        await obj.save();
        
        const spec=await special.find().sort({spc:1});
        const doc=await doctor.find().sort({spc:1,name:1});
        res.render('patient/makeAppointment',{user:a,spec:spec,today:today,hour:hour,doc:doc,t1:obj.tokenNo,t2:obj.fee,msg:"Your Appointment Successfully Booked.",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/viewAppointments',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.userid);
        var obj2=await appointment.find({$and:[{date:{$lt:today}},{p_id:req.query.userid}]}).sort({date:-1});
        var obj1=await appointment.find({$and:[{date:{$gte:today}},{p_id:req.query.userid}]}).sort({date:1});
        
        res.render('patient/viewAppointments',{user:obj,t1:obj1,t2:obj2,token:token});

    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/deleteAppointment',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        await appointment.findByIdAndRemove(req.query.id);
        var obj=await patient.findById(req.query.userid);
        var obj2=await appointment.find({$and:[{date:{$lt:today}},{p_id:req.query.userid}]}).sort({date:-1});
        var obj1=await appointment.find({$and:[{date:{$gte:today}},{p_id:req.query.userid}]}).sort({date:1});
        
        res.render('patient/viewAppointments',{user:obj,t1:obj1,t2:obj2,token:token});

    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/editProfile',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.userid);
        res.render('patient/editProfile',{user:obj,msg:"",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/editProfile2',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.id);
            obj.name=req.body.name;
            obj.city=req.body.city;
            obj.contact=req.body.contact;
            obj.age=req.body.age;
            obj.gender=req.body.gender;
            obj.email=req.body.email;
            await obj.save();
            await appointment.updateMany({p_id:obj._id},{$set:{pname:obj.name}});
        res.render('patient/editProfile',{user:obj,msg:"Profile updated!",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/changePassword',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.userid);
        res.render('patient/changePassword',{user:obj,msg:"",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/changePassword2',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.findById(req.query.id);
        if(await bcrypt.compare(req.body.pwd, obj.pwd))
        {
            var encrypted=await bcrypt.hash(req.body.npwd,10);
            obj.pwd=encrypted;
            await obj.save();
            res.render('patient/changePassword',{msg:"Your password Updated !!",user:obj,token:token});
        }
        else
        {
            res.render('patient/changePassword',{msg:"Old Password not match !!",user:obj,token:token});
        }
    }
    catch(err)
    {
        res.send(err);
    }
});





















module.exports=router;