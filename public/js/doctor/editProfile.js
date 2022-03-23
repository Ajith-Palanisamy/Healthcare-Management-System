function validate()
    {
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
       document.getElementById("spcErr").innerHTML="";
    }