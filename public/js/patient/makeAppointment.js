    function  fn()
    {
        document.getElementById("dname").value=document.getElementById("spc").value;
    }
    function validate()
    {
        var a=document.getElementById("spc").value;
        if(a==="select")
        {
            document.getElementById("spcErr").innerHTML="Select Specialization";
            //alert("Select Specialization");
            document.getElementById("spc").focus();
            return false;
        }
        else{
            document.getElementById("spcErr").innerHTML="";
        }
        var b=document.getElementById("dname").value;
        if(b==a||a.includes(b)||b==null||b==""||b=="select")
        {
            document.getElementById("docErr").innerHTML="Select your concern doctor";
            //alert("Select your concern doctor");
            document.getElementById("dname").focus();
            return false;
        }
        else{
            document.getElementById("docErr").innerHTML="";
        }

    }