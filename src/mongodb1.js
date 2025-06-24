const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://u2104048:2fydIUYNqEDKeGkG@spaceupmanagement.w6atxac.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const carParking=new mongoose.Schema({ 
    spot:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

const carParkingCollection=new mongoose.model('carParkingCollection',carParking) /*sooter */

module.exports=carParkingCollection