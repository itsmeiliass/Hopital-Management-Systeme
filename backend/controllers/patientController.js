const Patient = require('../models/Patient')
const Room = require('../models/Room')

exports.createPatient = async (req , res) => {
try {
const {full_name,age,sex,admitionDate , roomNumber } = req.body 
let room = null 

//if room num provided validate it
if(roomNumber) {
    room = await Room.fndOne({ roomNumber})
    if(!room) res.status(404).json({message : 'Room Not found , please enter a valid room number '})
    if(room.status == 'occupied') res.status(400).json({messahe : 'Room occupied by another patient '})

    room.status = 'occupied'
    await room.save()
}

const patient = new Patient({
    full_name ,
    age ,
    sex ,
    admitionDate ,
    roomId : room ? room._id : null   // link to room in db
})

await patient.save()
res.status(201).json(patient)

} catch (error) {
    res.status(400).json({error : error.message})
    
}    
}


// Admit Patient (must specify roomNumber)
exports.admitPatient = async (req, res) => {
  try {
    const { full_name,age,sex,admitionDate , roomNumber} = req.body

    const room = await Room.findOne({ roomNumber })
    if (!room) return res.status(404).json({ message: 'Room not found' })
    if (room.status === 'occupied') return res.status(400).json({ message: 'Room occupied' })

    const patient = new Patient({ full_name, age,sex,admitionDate, roomId: room._id })
    await patient.save()

    room.status = 'occupied'
    await room.save()

    res.status(201).json({ message: 'Patient admitted', patient })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

// Discharge Patient (free the room)
exports.dischargePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('roomId')
    if (!patient) return res.status(404).json({ message: 'Patient not found' })

    if (patient.roomId) {
      const room = await Room.findById(patient.roomId._id)
      room.status = 'available'
      await room.save()
    }

    patient.roomId = null
    await patient.save()

    res.status(200).json({ message: 'Patient discharged' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// READ all  patients
exports.getPatients = async (req , res) => {
try {
    const patients = await Patient.find().populate('roomId')
    res.status(200).json(patients)
} catch (error) {
    res.status(500).json({error : error.message })
}

}

// READ single patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('roomId')
    if (!patient) return res.status(404).json({ message: 'Patient not found' })
    res.status(200).json(patient)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}