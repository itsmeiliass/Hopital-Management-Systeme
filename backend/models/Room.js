const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
 roomNumber: {
    type: Number,
    required: true,
    unique: true 
  },
  type: {
    type: String,
    enum: ['General', 'ICU', 'Emergency', 'Private'], 
    default: 'General'
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  }

})

module.exports = mongoose.model('Room',roomSchema)
