import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Registration from './components/Registration';
import Login from './components/Login';
import Recipelist from './components/Recipelist';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';

function App() {
    const loggedInUser = localStorage.getItem('username'); 

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/registration" element={<Registration />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/recipelist" 
                        element={loggedInUser ? <Recipelist /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/profile" 
                        element={loggedInUser ? <ProfilePage /> : <Navigate to="/login" />} 
                    />
                    {/* Redirect to HomePage if no other route matches */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
