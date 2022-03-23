    function validate()
    {
       var a=document.getElementById("name").value;
       if(a=="" || a==null)
       {
        document.getElementById("nameErr").innerHTML="Enter your name";
        document.getElementById("name").focus();
        return false;
       }
       else
       {
        document.getElementById("nameErr").innerHTML="";
       }
    
       var b=document.getElementById("city").value;
       if(b=="" || b==null)
       {
        document.getElementById("cityErr").innerHTML="Enter Your city.";
        document.getElementById("city").focus();
         return false;
       }
       else
       document.getElementById("cityErr").innerHTML="";
       
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
       var ag=document.getElementById("age").value;
       
       if(ag==null || ag<=0|| ag>100)
       {
        document.getElementById("ageErr").innerHTML="Enter a valid age[0-100]";
        document.getElementById("age").focus();
           return false;
       }
       else
       document.getElementById("ageErr").innerHTML="";

       if(!(document.getElementById("male").checked||document.getElementById("female").checked||document.getElementById("others").checked))
       {
        document.getElementById("genderErr").innerHTML="Select gender";
         return false;
       }
       else
       document.getElementById("genderErr").innerHTML="";
    }