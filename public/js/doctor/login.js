function validate()
    {
       var c=document.getElementById("email").value;
       var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if(!c.match(email))
       {
        document.getElementById("emailErr").innerHTML="Enter a valid Email.";
        document.getElementById("email").focus();
         return false;
       }
       else
       document.getElementById("emailErr").innerHTML="";

       var d=document.getElementById("pwd").value;
       if(d==null || d=="")
       {
        document.getElementById("pwdErr").innerHTML="Enter your Password";
        document.getElementById("pwd").focus();
         return false;
       }
       else
       document.getElementById("pwdErr").innerHTML="";

    }