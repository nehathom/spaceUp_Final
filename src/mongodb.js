const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://u2104048:2fydIUYNqEDKeGkG@spaceupmanagement.w6atxac.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }, 
    uid:{
        type:String,
        required:true
    }, 
    reg:{
        type:String,
        required:true
    }, 
    phone:{
        type:String,
        required:true
    }, 
    branch:{
        type:String,
        required:true
    }, 
    gradyear:{
        type:String,
        required:true
    },  
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema) /*login details */

module.exports=LogInCollection

