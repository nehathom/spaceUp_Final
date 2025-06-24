const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://u2104048:2fydIUYNqEDKeGkG@spaceupmanagement.w6atxac.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const carpoolAddin=new mongoose.Schema({ 
    useruseruser:{
        type:String,
        required:true
    },
    availability:{
        type:Number,
        required:true
    },
    destinationStart:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    specificStops:{
        type:String,
        required:true
    }
})

const carpoolAddinCollection=new mongoose.model('carpoolAddinCollection',carpoolAddin) /*carpool addin */
 
module.exports=carpoolAddinCollection