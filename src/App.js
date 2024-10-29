import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Registration />} /> 
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
