function validate()
        {
            var c=document.getElementById("pwd").value;
           if(c==""||c==null)
           {
            document.getElementById("pwdErr").innerHTML="Enter Your Current Password !!";
            document.getElementById("pwd").focus();
             return false;
           }
           else
           document.getElementById("pwdErr").innerHTML="";

           var d=document.getElementById("npwd").value;
           var e=document.getElementById("cpwd").value;
           if(d==null || d=="")
           {
            document.getElementById("npwdErr").innerHTML="Enter New Password";
            document.getElementById("npwd").focus();
             return false;
           }
           else
           document.getElementById("npwdErr").innerHTML="";
           if(e==null||e=="")
           {
            document.getElementById("cpwdErr").innerHTML="Confirm Your Password";
            document.getElementById("cpwd").focus();
             return false;
           }
           else
           document.getElementById("cpwdErr").innerHTML="";
           if(d!=e)
           {
            document.getElementById("npwdErr").innerHTML="New Password and Confirm Password must be same.";
            document.getElementById("npwd").focus();
             return false;
           }
           else
           document.getElementById("npwdErr").innerHTML="";
        }