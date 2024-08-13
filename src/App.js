import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Recipelist from './components/Recipelist';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage'; // Import HomePage component

function App() {
    const loggedInUser = localStorage.getItem('username'); // Check if user is logged in

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
                    <Route path="/registration" element={<Registration />} /> {/* Added registration path */}
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/recipelist" 
                        element={loggedInUser ? <Recipelist /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/profile" 
                        element={loggedInUser ? <ProfilePage /> : <Navigate to="/login" />} 
                    />
                    {/* Redirect to the HomePage if no other route matches */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
