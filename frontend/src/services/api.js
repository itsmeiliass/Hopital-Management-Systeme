// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Patients API
export const patientAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  admit: (data) => api.post('/patients/admit', data),
  discharge: (id) => api.put(`/patients/${id}/discharge`),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Rooms API
export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getAvailable: () => api.get('/rooms/available'),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

export const doctorAPI = {
getAll : () => api.get('/doctors'),
getById : (id) => api.get(`/doctors/${id}`),
create : (data) => api.post('/doctos' , data)
};

export default api;