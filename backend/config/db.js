const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/hospitalDB'
const connectDB = async ()=>{

    try {
        await mongoose.connect(dbUrl)
        console.log(`conected to database :  ${dbUrl}`)
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }

}
module.exports = connectDB