// components/Dashboard.js
import React from 'react';
import { usePatients } from '../context/PatientContext';
import { useRooms } from '../context/RoomContext';
import { useDoctors } from '../context/DoctorContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { patients } = usePatients();
  const { rooms, availableRooms } = useRooms();
  const {doctors } = useDoctors();

  const admittedPatients = patients.filter(p => p.roomId);
  const availableRoomsCount = availableRooms.length;
  const occupiedRoomsCount = rooms.length - availableRoomsCount;
  const availableDoctorsCount = doctors.length ;

  return (
    <div className="dashboard">
      <h2>Hospital Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <div className="stat-number">{patients.length}</div>
          <Link to="/patients" className="stat-link">View All</Link>
        </div>
        
        <div className="stat-card">
          <h3>Admitted Patients</h3>
          <div className="stat-number">{admittedPatients.length}</div>
          <Link to="/patients" className="stat-link">View Admitted</Link>
        </div>

         <div className="stat-card">
          <h3>Doctors Available</h3>
          <div className="stat-number">{availableDoctorsCount}</div>
          <Link to="/doctors" className='stat-link'> View Doctors </Link>
        </div>
        
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <div className="stat-number">{rooms.length}</div>
          <Link to="/rooms" className="stat-link">View All</Link>
        </div>
        
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="stat-number">{availableRoomsCount}</div>
          <Link to="/rooms" className="stat-link">View Available</Link>
        </div>
      </div>

     
      

      <div className="recent-section">
        <div className="recent-patients">
          <h3>Recent Patients</h3>
          {patients.slice(0, 5).map(patient => (
            <div key={patient._id} className="recent-item">
              <span>{patient.full_name}</span>
              <span className={`status ${patient.roomId ? 'admitted' : 'not-admitted'}`}>
                {patient.roomId ? 'Admitted' : 'Not Admitted'}
              </span>
            </div>
          ))}
        </div>

        <div className="room-status">
          <h3>Room Status</h3>
          {rooms.slice(0, 5).map(room => (
            <div key={room._id} className="recent-item">
              <span>Room {room.roomNumber} ({room.type})</span>
              <span className={`status ${room.status === 'available' ? 'available' : 'occupied'}`}>
                {room.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;