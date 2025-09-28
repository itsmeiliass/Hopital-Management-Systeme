// components/PatientForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { useRooms } from '../context/RoomContext';

const PatientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { patients, createPatient, updatePatient, admitPatient } = usePatients();
  const { availableRooms, fetchAvailableRooms } = useRooms();
  
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    sex: '',
    admitionDate: new Date().toISOString().split('T')[0],
    roomNumber: ''
  });
  
  const [admitMode, setAdmitMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEdit = Boolean(id);

  useEffect(() => {
    fetchAvailableRooms();
    
    if (isEdit) {
      const patient = patients.find(p => p._id === id);
      if (patient) {
        setFormData({
          full_name: patient.full_name,
          age: patient.age,
          sex: patient.sex,
          admitionDate: new Date(patient.admitionDate).toISOString().split('T')[0],
          roomNumber: patient.roomId ? patient.roomId.roomNumber : ''
        });
      }
    }
  }, [id, isEdit, patients, fetchAvailableRooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (admitMode || (isEdit && formData.roomNumber)) {
        await admitPatient(formData);
      } else if (isEdit) {
        await updatePatient(id, formData);
      } else {
        await createPatient(formData);
      }
      navigate('/patients');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Patient' : 'Add New Patient'}</h2>
      
      {error && <div className="error alert">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label>Sex:</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Admission Date:</label>
          <input
            type="date"
            name="admitionDate"
            value={formData.admitionDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Room Number (optional):</label>
          <select
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          >
            <option value="">No Room Assignment</option>
            {availableRooms.map(room => (
              <option key={room._id} value={room.roomNumber}>
                Room {room.roomNumber} ({room.type})
              </option>
            ))}
          </select>
        </div>

        {!isEdit && formData.roomNumber && (
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={admitMode}
                onChange={(e) => setAdmitMode(e.target.checked)}
              />
              Admit patient to room immediately
            </label>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Patient' : 'Create Patient')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;