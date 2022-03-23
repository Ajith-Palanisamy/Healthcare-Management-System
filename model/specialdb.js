const mongoose=require('mongoose');
const specialSchema=new mongoose.Schema({
    spc:{
        type:String,
        required:true,
        unique:true
    }
});
module.exports=mongoose.model('special',specialSchema);