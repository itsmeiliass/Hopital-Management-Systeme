// components/RoomForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';

const RoomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rooms, createRoom, updateRoom } = useRooms();
  
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'General',
    status: 'available'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const room = rooms.find(r => r._id === id);
      if (room) {
        setFormData({
          roomNumber: room.roomNumber,
          type: room.type,
          status: room.status
        });
      }
    }
  }, [id, isEdit, rooms]);

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
      if (isEdit) {
        await updateRoom(id, formData);
      } else {
        await createRoom(formData);
      }
      navigate('/rooms');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Room' : 'Add New Room'}</h2>
      
      {error && <div className="error alert">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Room Number:</label>
          <input
            type="number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Room Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="General">General</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Room' : 'Create Room')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/rooms')}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;