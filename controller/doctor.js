const express=require("express");
const router=express.Router();
const special=require('../model/specialdb');
const doctor=require('../model/doctordb');
const appointment=require('../model/appointmentdb');
const patient=require('../model/patientdb');
const auth = require("../auth/auth");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

router.use('/doctor_login',(req,res)=>
{
    res.render('doctor/doctor_login',{msg:"",emailErr:"",pwdErr:"",email:"",pwd:""});
});

router.post('/login',async(req,res)=>
{
    try{
        var {email,pwd}=req.body;
        const obj=await doctor.findOne({email:`${email}`});
        if(obj!=null && await bcrypt.compare(pwd, obj.pwd))
        {
            var id=obj._id;
            const token = jwt.sign(
                {email,id},
                process.env.TOC,
                {
                  expiresIn: "2h",
                }
              );
            
            res.render('doctor/dashboard',{user:obj,token:token});
        }
        else if(obj!=null)
        {
            console.log("Err1");
           res.render('doctor/doctor_login',{msg:"",emailErr:"",pwdErr:"Incorrect Password",email:email,pwd:pwd});
        }
        else
        {
            console.log("Err3");
            res.render('doctor/doctor_login',{msg:"",emailErr:"Doctor with this email does not exist",pwdErr:"",email:email,pwd:pwd});
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
    var obj=await doctor.findOne({_id:req.query.id});
    res.render('doctor/dashboard',{user:obj,token:token});
});

router.get('/editProfile',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await doctor.findById(req.query.userid);
        res.render('doctor/editProfile',{user:obj,msg:"",token:token});
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
            var obj=await doctor.findById(req.query.id);
                obj.name=req.body.name;
                obj.spc=req.body.spc;
                obj.contact=req.body.contact;
                obj.fee=req.body.fee;
                obj.email=req.body.email;
                await obj.save();
                await appointment.updateMany({d_id:obj._id},{$set:{dname:obj.name,fee:obj.fee}});
            res.render('doctor/editProfile',{user:obj,msg:"Profile updated!",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

        var date=new Date();
        var day=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        if(m<10)m="0"+m;
        if(day<10)day="0"+day;
        var today=y+"-"+m+"-"+day; 


router.get('/viewAppointments',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await doctor.findById(req.query.userid);
        var obj2=await appointment.find({$and:[{date:{$lt:today}},{d_id:req.query.userid}]}).sort({date:-1,tokenNo:1});
        var obj1=await appointment.find({$and:[{date:{$gte:today}},{d_id:req.query.userid}]}).sort({date:1,tokenNo:1});
        res.render('doctor/viewAppointments',{user:obj,t1:obj1,t2:obj2,token:token});

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
        var obj=await doctor.findById(req.query.userid);
        var obj2=await appointment.find({$and:[{date:{$lt:today}},{d_id:req.query.userid}]}).sort({date:-1});
        var obj1=await appointment.find({$and:[{date:{$gte:today}},{d_id:req.query.userid}]}).sort({date:1});
        
        res.render('doctor/viewAppointments',{user:obj,t1:obj1,t2:obj2,token:token});

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
        var obj=await doctor.findById(req.query.userid);
        res.render('doctor/changePassword',{user:obj,msg:"",token:token});
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
        var obj=await doctor.findById(req.query.id);
        if(await bcrypt.compare(req.body.pwd, obj.pwd))
        {
            var encrypted=await bcrypt.hash(req.body.npwd,10);
            obj.pwd=encrypted;
            await obj.save();
            res.render('doctor/changePassword',{msg:"Your password Updated !!",user:obj,token:token});
        }
        else
        {
            res.render('doctor/changePassword',{msg:"Old Password not match !!",user:obj,token:token});
        }
    }
    catch(err)
    {
        res.send(err);
    }
});







module.exports=router;