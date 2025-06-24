const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://u2104048:2fydIUYNqEDKeGkG@spaceupmanagement.w6atxac.mongodb.net/")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const carParkingcar=new mongoose.Schema({ 
    spot:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

const carParkingCollectioncar=new mongoose.model('carParkingCollectioncar',carParkingcar) /*car parking */

module.exports=carParkingCollectioncar