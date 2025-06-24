const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://u2104048:2fydIUYNqEDKeGkG@spaceupmanagement.w6atxac.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const carpoolRequest=new mongoose.Schema({ 
    user:{
        type:String,
        required:true
    },
    stop:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})

const carpoolRequestCollection=new mongoose.model('carpoolRequestCollection',carpoolRequest) /*carpool request */

module.exports=carpoolRequestCollection