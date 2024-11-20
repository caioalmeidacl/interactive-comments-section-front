import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../store/features/userSlice';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    
    return (
        token 
            ? children
            : <Navigate to={'/'}  state={{ from: location }} replace />
    );
}

export { ProtectedRoute }