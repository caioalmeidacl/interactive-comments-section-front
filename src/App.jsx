import React, { useEffect, useState, createContext } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { InteractiveSection } from "./pages/InteractiveSection";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, [userInfo]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {!user ? (<Route path="/" element={<Login />} />)
            : (
              <>
                <Route path="home" element={<ProtectedRoute><InteractiveSection /></ProtectedRoute>} />
              </>
            )}
            <Route path="*" element={<h1 className="fixed text-white flex items-center justify-center text-7xl bg-black h-full w-full">PAGE NOT FOUND</h1>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
