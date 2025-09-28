// context/PatientContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { patientAPI } from '../services/api';

const PatientContext = createContext();

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData) => {
    try {
      const response = await patientAPI.create(patientData);
      setPatients(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to create patient');
    }
  };

  const admitPatient = async (patientData) => {
    try {
      const response = await patientAPI.admit(patientData);
      await fetchPatients(); // Refresh the list
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to admit patient');
    }
  };

  const dischargePatient = async (id) => {
    try {
      await patientAPI.discharge(id);
      await fetchPatients(); // Refresh the list
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to discharge patient');
    }
  };

  const updatePatient = async (id, patientData) => {
    try {
      const response = await patientAPI.update(id, patientData);
      setPatients(prev => prev.map(p => p._id === id ? response.data : p));
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update patient');
    }
  };

  const deletePatient = async (id) => {
    try {
      await patientAPI.delete(id);
      setPatients(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete patient');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const value = {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
    admitPatient,
    dischargePatient,
    updatePatient,
    deletePatient,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};