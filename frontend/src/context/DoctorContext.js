import React, { createContext, useState, useContext, useEffect, Children } from 'react';
import { doctorAPI } from '../services/api';
const Doctorcontext = createContext(); 

export const useDoctors = () =>{
    const context = useContext(Doctorcontext);
    if(!context) {
        throw new Error('useDoctors must be used within a DoctorProvider') ;
    }
    return context ;
};

export const DoctorProvider =({ children}) => {
const [doctors , setDoctors] = useState([]);
const [loading , setLoading ] = useState(false);
const [error , setError ] = useState(null);


const fetchDoctors = async () =>{
    setLoading(true);
    try {
        const response = await doctorAPI.getAll();
        setDoctors(response.data) ;
        setError(null);

    } catch (error) {
        setError(error.response?.data?.error || 'failed to fetch doctors');
    } finally {
        setLoading(false);
    }
};


useEffect(() => {
    fetchDoctors();
} , []);

const value = {
    doctors ,
    loading ,
    error ,
    fetchDoctors ,
};


return (
<Doctorcontext.Provider value={value}>
{children }
</Doctorcontext.Provider>
);

};