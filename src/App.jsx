import React, { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { InteractiveSection } from "./pages/InteractiveSection";
import { getToken, getUser } from "./store/features/manageStorage";

function App() {
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Routes>
            {!user ? (
                <Route path="/" element={<Login />} />
            ) : (
                <Route path="/" element={<ProtectedRoute><InteractiveSection /> </ProtectedRoute>} />
            )}
            <Route path="/home" element={<ProtectedRoute><InteractiveSection /> </ProtectedRoute>} />
            <Route path="*" element={<h1 className="fixed text-white flex items-center justify-center text-7xl bg-black h-full w-full">PAGE NOT FOUND</h1>} />
        </Routes>
    )
}

export default App;