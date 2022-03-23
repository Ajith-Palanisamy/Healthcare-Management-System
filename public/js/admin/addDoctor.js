function validate()
{
   
   var b=document.getElementById("spc").value;
   if(b=="none")
   {
    document.getElementById("spcErr").innerHTML="Doctor Specialization must be entered.";
    document.getElementById("spc").focus();
     return false;
   }
   else
   document.getElementById("spcErr").innerHTML="";

   var a=document.getElementById("name").value;
   if(a=="" || a==null)
   {
    document.getElementById("nameErr").innerHTML="Doctor name must be entered.";
    document.getElementById("name").focus();
     return false;
   }
   else
   document.getElementById("nameErr").innerHTML="";

   var f=document.getElementById("fee").value;
   if(f==""||f==null||f==0)
   {
    document.getElementById("feeErr").innerHTML="Doctor Consultancy Fee must be entered.";
    document.getElementById("fee").focus();
     return false;
   }
   else
   document.getElementById("feeErr").innerHTML="";

   var g=document.getElementById("contact").value;
   var contact=/[6-9]{1}[0-9]{9}/;
   if(!g.match(contact)||g.length>10)
   {
   document.getElementById("contactErr").innerHTML="Enter a valid Contact Number.";
    document.getElementById("contact").focus();
     return false;
   }
   else
   document.getElementById("contactErr").innerHTML="";

   var c=document.getElementById("email").value;
   var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(!c.match(email))
   {
    document.getElementById("emailErr").innerHTML="Please Enter a valid Email.";
    document.getElementById("email").focus();
     return false;
   }
   else
   document.getElementById("emailErr").innerHTML="";

   var d=document.getElementById("pwd").value;
   var e=document.getElementById("cpwd").value;
if(d==null || d=="")
{
document.getElementById("pwdErr").innerHTML="Enter your Password";
document.getElementById("pwd").focus();
 return false;
}
else
document.getElementById("pwdErr").innerHTML="";

if(e==null || e=="")
{
document.getElementById("cpwdErr").innerHTML="Re-enter the Password";
document.getElementById("cpwd").focus();
 return false;
}
else
document.getElementById("cpwdErr").innerHTML="";
if(d!=e)
{
document.getElementById("pwdErr").innerHTML="Password and Confirm Password must be same.";
document.getElementById("pwd").focus();
 return false;
}
else
document.getElementById("pwdErr").innerHTML="";
}