function validate()
{
    var a=document.getElementById("spc").value;
    if(a==""||a==null)
    {
        document.getElementById("spcErr").innerHTML="Enter valid Specialization";
        document.getElementById("spc").focus();
        return false;
    }
    else
    document.getElementById("spcErr").innerHTML="";
}