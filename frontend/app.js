// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import { RoomProvider } from './context/RoomContext';
import { DoctorProvider } from './context/DoctorContext';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import RoomList from './components/RoomList';
import RoomForm from './components/RoomForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <PatientProvider>
      <RoomProvider>
        <DoctorProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/new" element={<PatientForm />} />
                <Route path="/patients/edit/:id" element={<PatientForm />} />
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/rooms/new" element={<RoomForm />} />
                <Route path="/rooms/edit/:id" element={<RoomForm />} />
              </Routes>
            </div>
          </div>
        </Router>
        </DoctorProvider>
      </RoomProvider>
    </PatientProvider>
  );
}

export default App;