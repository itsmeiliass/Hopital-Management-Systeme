// context/RoomContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { roomAPI } from '../services/api';

const RoomContext = createContext();

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await roomAPI.getAll();
      setRooms(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await roomAPI.getAvailable();
      setAvailableRooms(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch available rooms');
    }
  };

  const createRoom = async (roomData) => {
    try {
      const response = await roomAPI.create(roomData);
      setRooms(prev => [...prev, response.data]);
      await fetchAvailableRooms();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to create room');
    }
  };

  const updateRoom = async (id, roomData) => {
    try {
      const response = await roomAPI.update(id, roomData);
      setRooms(prev => prev.map(r => r._id === id ? response.data : r));
      await fetchAvailableRooms();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update room');
    }
  };

  const deleteRoom = async (id) => {
    try {
      await roomAPI.delete(id);
      setRooms(prev => prev.filter(r => r._id !== id));
      await fetchAvailableRooms();
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete room');
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAvailableRooms();
  }, []);

  const value = {
    rooms,
    availableRooms,
    loading,
    error,
    fetchRooms,
    fetchAvailableRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};