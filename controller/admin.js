const express=require("express");
const router=express.Router();
const admin=require('../model/admindb');
const special=require('../model/specialdb');
const doctor=require('../model/doctordb');
const appointment=require('../model/appointmentdb');
const patient=require('../model/patientdb');
const auth = require("../auth/auth");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

router.use('/admin_login',(req,res)=>
{
    res.render('admin/admin_login',{msg:"",emailErr:"",pwdErr:"",username:"",password:""});
});

router.post('/login',async(req,res)=>
{
    try{
        var {username,password}=req.body;

        const obj=await admin.findOne({username:`${username}`});
        if(obj!=null && await bcrypt.compare(password,obj.password))
        {
            var id=obj._id;
            const token = jwt.sign(
                {username,id},
                process.env.TOC,
                {
                  expiresIn: "2h",
                }
              );
              
            res.render('admin/dashboard',{token:token});
            
        }
        else if(obj!=null)
        {
            console.log("Err1");
            console.log(obj);
           res.render('admin/admin_login',{msg:"",emailErr:"",pwdErr:"Incorrect Password",username:username,password:password});
        }
        else
        {
            console.log("Err3");
            res.render('admin/admin_login',{msg:"",emailErr:"Invalid Username",pwdErr:"",username:username,password:password});
        }
    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/loginSuccess',auth,async(req,res)=>
{
    var token=req.query.token;
    res.render('admin/dashboard',{token:token});
});

router.use('/addSpecialization',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        const result=await special.find().sort({spc:1});
        res.render('admin/addSpecialization',{result:result,token:token});
    }
    catch(err)
    {
        res.send(err);
    }
        
});

router.post('/addSpecialization1',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var spc=req.body.spc;
        var obj=new special(
            {
                spc:req.body.spc
            }
        );
        await obj.save();
        const result=await special.find().sort({spc:1});
        res.render('admin/addSpecialization',{result:result,token:token});
    }
    catch(err){
        res.send(err);
    }
});

router.get('/removeSpecialization',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        await special.findByIdAndRemove(req.query.id);
        const result=await special.find().sort({spc:1});
        res.render('admin/addSpecialization',{result:result,token:token});
    }
    catch(err)
    {
        res.send(err);
    }
        
});

router.get('/addDoctor',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        const result=await special.find().sort({spc:1});
        res.render('admin/addDoctor',{msg:"",result:result,token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/validateDoctor',auth,async(req,res)=>
{
     try{
        var token=req.query.token;
        var obj=new doctor({
            spc:req.body.spc,
            name:req.body.name,
            fee:req.body.fee,
            contact:req.body.contact,
            email:req.body.email,
            pwd:req.body.pwd
        });
        const result=await doctor.find({email:`${req.body.email}`});
        if(result.length==0)
        {
            var encrypted=await bcrypt.hash(req.body.pwd,10);
            obj.pwd=encrypted;
            await obj.save();
            const result=await special.find().sort({spc:1});
            res.render('admin/addDoctor',{msg:"Doctor Successfully added!",result:result,token:token});
        }
        else
        {
            const result=await special.find().sort({spc:1});
            res.render('admin/reAddDoctor',{msg:"Doctor with this Email is already Exist",obj:obj,result:result,token:token});
        }
     }
     catch(err)
     {
        res.send(err);
    }
});

router.get('/viewDoctors',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        const result=await doctor.find().sort({spc:1,name:1});
        res.render('admin/viewDoctors',{result:result,token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.get('/updateDoctor',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        const result=await special.find().sort({spc:1});
        const obj=await doctor.findById(req.query.id);
        res.render('admin/updateDoctor',{obj:obj,result:result,msg:"",token:token});
    }
    catch(err)
    {
        res.send(err);
    }
});

router.post('/validateUpdateDoctor',auth,async(req,res)=>
{
     try{
        var token=req.query.token;
        const obj=await doctor.findById(req.query.id);
        const result=await doctor.find({$and:[{email:`${req.body.email}`},{_id:{$ne:req.query.id} }] });
        if(result.length==0)
        {
            obj.spc=req.body.spc;
            obj.name=req.body.name;
            obj.fee=req.body.fee;
            obj.contact=req.body.contact;
            obj.email=req.body.email;
            obj.pwd=req.body.pwd;
            var encrypted=await bcrypt.hash(req.body.pwd,10);
            obj.pwd=encrypted;
            await obj.save();
            await appointment.updateMany({d_id:obj._id},{$set:{dname:obj.name,fee:obj.fee}});
            const result=await special.find().sort({spc:1});
            res.render('admin/updateDoctor',{obj:obj,msg:"Doctor Successfully updateded!",result:result,token:token});
        }
        else
        {
            var obj1=new doctor({
                _id:req.query.id,
                spc:req.body.spc,
                name:req.body.name,
                fee:req.body.fee,
                contact:req.body.contact,
                email:req.body.email,
                pwd:req.body.pwd,
                cpwd:req.body.cpwd
            });   
            const result=await special.find().sort({spc:1});
            res.render('admin/updateDoctor',{msg:"Doctor with this Email is already Exist",obj:obj1,result:result,token:token});
        }
     }
     catch(err)
     {
        res.send(err);
    }
});

router.get('/removeDoctor',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        await doctor.findByIdAndRemove(req.query.id);
        res.redirect('viewDoctors',{token:token});
    }
    catch(err)
    {
        res.send(err);
    }
        
});

router.get('/viewPatients',auth,async(req,res)=>
{
    try{
        var token=req.query.token;
        var obj=await patient.find().sort({name:1});
        res.render('admin/viewPatients',{result:obj,token:token});
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
        var obj2=await appointment.find({date:{$lt:today}}).sort({date:-1,spc:1,dname:1,tokenNo:1});
        var obj1=await appointment.find({date:{$gte:today}}).sort({date:1,spc:1,dname:1,tokenNo:1});
        res.render('admin/viewAppointments',{t1:obj1,t2:obj2,token:token});
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
        res.redirect('viewAppointments?token='+token);
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
        const obj=await admin.findOne();
        res.render('admin/changePassword',{user:obj,msg:"",token:token});
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
        var obj=await admin.findOne();
        if(obj.username!=req.body.email)
        {
            res.render('admin/changePassword',{msg:"Old Username not match !!",user:obj,token:token});
        }
        else{
        if(await bcrypt.compare(req.body.pwd, obj.password))
        {
            var encrypted=await bcrypt.hash(req.body.npwd,10);
            obj.password=encrypted;
            obj.username=req.body.nemail;
            await obj.save();
            res.render('admin/changePassword',{msg:"Username and Password updated!!",user:obj,token:token});
        }
        else
        {
            res.render('admin/changePassword',{msg:"Old Password not match !!",user:obj,token:token});
        }
        }
    }
    catch(err)
    {
        res.send(err);
    }
});

































module.exports=router;