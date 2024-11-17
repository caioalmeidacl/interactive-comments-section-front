import React, { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext);
    
    if (!user) {
        return <Navigate to={"/"}/>
    }
    
    return children;
}

export { ProtectedRoute }