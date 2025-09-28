const express = require('express');
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  
 
  admitPatient,
  dischargePatient
} = require('../controllers/patientController');

router.post('/', createPatient);                 // Create patient
router.get('/', getPatients);                    // List patients
router.get('/:id', getPatientById);             // Get one patient              
router.post('/admit', admitPatient);            // Admit with room
router.patch('/:id/discharge', dischargePatient); // Discharge patient

module.exports = router;
