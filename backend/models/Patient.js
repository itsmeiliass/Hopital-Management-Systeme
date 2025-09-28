const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
full_name : String ,
age : {type:Number , min : 18 , max : 100 },
sex : {type:String , enum:['male' , 'female'] },
admitionDate : {type:Date , default : Date.now },
roomId : {type : mongoose.Schema.Types.ObjectId , ref : 'Room', Default:null}

})

module.exports = mongoose.model('Patient',patientSchema)