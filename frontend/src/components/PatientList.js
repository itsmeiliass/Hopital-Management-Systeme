// components/PatientList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

const PatientList = () => {
  const { patients, loading, error, dischargePatient, deletePatient } = usePatients();
  const [discharging, setDischarging] = useState(null);

  const handleDischarge = async (id) => {
    setDischarging(id);
    try {
      await dischargePatient(id);
    } catch (err) {
      alert(err.message);
    } finally {
      setDischarging(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading patients...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="patient-list">
      <div className="header">
        <h2>Patient Management</h2>
        <Link to="/patients/new" className="btn btn-primary">
          Add New Patient
        </Link>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Admission Date</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.full_name}</td>
                <td>{patient.age}</td>
                <td>{patient.sex}</td>
                <td>{new Date(patient.admitionDate).toLocaleDateString()}</td>
                <td>
                  {patient.roomId ? (
                    `Room ${patient.roomId.roomNumber} (${patient.roomId.type})`
                  ) : (
                    'Not Assigned'
                  )}
                </td>
                <td className="actions">
                  <Link 
                    to={`/patients/edit/${patient._id}`} 
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>
                  {patient.roomId && (
                    <button
                      onClick={() => handleDischarge(patient._id)}
                      disabled={discharging === patient._id}
                      className="btn btn-sm btn-warning"
                    >
                      {discharging === patient._id ? 'Discharging...' : 'Discharge'}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {patients.length === 0 && (
          <div className="no-data">No patients found</div>
        )}
      </div>
    </div>
  );
};

export default PatientList;