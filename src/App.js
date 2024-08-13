import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Recipelist from './components/Recipelist'; 

function App() {
    const loggedInUser = localStorage.getItem('username'); 

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/Recipelist" 
                        element={loggedInUser ? <Recipelist /> : <Navigate to="/login" />} 
                    />
                    {/* Redirect to the Registration page if no other route matches */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
