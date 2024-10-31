import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Registration from './components/Registration';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage'; 

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} /> 
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
