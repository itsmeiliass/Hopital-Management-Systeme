import React from 'react';
import { useDoctors } from '../context/DoctorContext';

const DoctorList = () => {
  const { doctors, loading, error } = useDoctors();

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="doctor-list">
      <div className="page-header">
        <h2>Doctors</h2>
      </div>

      <div className="cards-grid">
        {doctors.map(doctor => (
          <div key={doctor._id} className="card">
            <div className="card-header">
              <h3>Dr. {doctor.full_name}</h3>
            </div>
            
            <div className="card-body">
              <div className="info-row">
                <label>Age:</label>
                <span>{doctor.age}</span>
              </div>

                  <div className="info-row">
                <label>department:</label>
                <span>{doctor.department}</span>
              </div>
              
              
              <div className="info-row">
                <label>Gender:</label>
                <span>{doctor.sex}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="empty-state">
          <p>No doctors found</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;