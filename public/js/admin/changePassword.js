function validate()
        {
           var a=document.getElementById("email").value;
           if(a==""||a==null)
           {
            document.getElementById("emailErr").innerHTML="Current Username Filed is Empty !!";
            document.getElementById("email").focus();
             return false;
           }
           else
           document.getElementById("emailErr").innerHTML="";

           var b=document.getElementById("nemail").value;
           
           if(b==""||b==null)
           {
            document.getElementById("nemailErr").innerHTML="New Username Filed is Empty !!";
            document.getElementById("nemail").focus();
             return false;
           }
           else
           document.getElementById("nemailErr").innerHTML="";

            var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!b.match(email))
            {
                document.getElementById("nemailErr").innerHTML="Enter a valid Email.";

                document.getElementById("nemail").focus();
                return false;
            }
            else
            document.getElementById("emailErr").innerHTML="";

           var c=document.getElementById("pwd").value;
           if(c==""||c==null)
           {
            document.getElementById("pwdErr").innerHTML="Current Password Filed is Empty !!";
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