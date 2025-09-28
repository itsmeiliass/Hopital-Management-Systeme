const mongoose = require('mongoose')

const doctorschema = mongoose.Schema({
full_name : String ,
age : {type : Number , min:22},
sex : {type : String , enum:['male','female'] },
department : {type : String , enum:['emergency','trauma','surgery'] }
}

)
module.exports = mongoose.model('Doctor',doctorschema)