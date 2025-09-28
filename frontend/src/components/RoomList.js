// components/RoomList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';

const RoomList = () => {
  const { rooms, loading, error, deleteRoom } = useRooms();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const getStatusBadge = (status) => {
    return status === 'available' ? 'badge-success' : 'badge-warning';
  };

  return (
    <div className="room-list">
      <div className="header">
        <h2>Room Management</h2>
        <Link to="/rooms/new" className="btn btn-primary">
          Add New Room
        </Link>
      </div>

      <div className="cards-container">
        {rooms.map(room => (
          <div key={room._id} className="card">
            <div className="card-header">
              <h3>Room {room.roomNumber}</h3>
              <span className={`badge ${getStatusBadge(room.status)}`}>
                {room.status}
              </span>
            </div>
            <div className="card-body">
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Status:</strong> {room.status}</p>
            </div>
            <div className="card-actions">
              <Link 
                to={`/rooms/edit/${room._id}`} 
                className="btn btn-sm btn-outline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(room._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {rooms.length === 0 && (
        <div className="no-data">No rooms found</div>
      )}
    </div>
  );
};

export default RoomList;