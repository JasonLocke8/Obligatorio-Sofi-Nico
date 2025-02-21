/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
 

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = () => {

        localStorage.removeItem('apiKey');
        localStorage.removeItem('id');

        navigate('/login');

    };

    return (
        <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;