import React from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { InteractiveSection } from "./pages/InteractiveSection";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
             <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<InteractiveSection />} />
             </Route>
            <Route path="*" element={<h1 className="fixed text-white flex items-center justify-center text-7xl bg-black h-full w-full">PAGE NOT FOUND</h1>} />
        </Routes>
    )
}

export default App;