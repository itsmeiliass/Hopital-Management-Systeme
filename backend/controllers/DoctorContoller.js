const Doctor = require('../models/Doctor')

exports.createDoctor = async(req , res )=>{
    try {
        const doc = new Doctor(req.body)
        await doc.save()
        res.status(201).json(doc)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.findDoctors = async(req , res ) => {

    try {
        const doctors = await Doctor.find()
        res.status(200).json(doctors)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.findDoctorById = async (req , res ) => {
try {
    const doctor = await Doctor.findById(req.params.id)
    if(!doctor) res.status(404).json('not found ')

    res.status(200).json(doctor)
    
} catch (error) {
    res.status(400).json({error : error.message })
}

}