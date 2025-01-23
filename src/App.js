import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Recipelist from './components/Recipelist';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username'));

    useEffect(() => {
        const handleStorageChange = () => {
            console.log("test",localStorage.getItem('username'));
            setLoggedInUser(localStorage.getItem('username'));
        };

        window.addEventListener('username', handleStorageChange);
        return () => window.removeEventListener('username', handleStorageChange);
    }, []);
console.log("logged",loggedInUser);
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                        path="/registration" 
                        element={loggedInUser ? <Navigate to="/" /> : <Registration />} 
                    />
                    <Route 
                        path="/login" 
                        element={loggedInUser ? <Navigate to="/profile" /> : <Login />} 
                    />
                    <Route 
                        path="/recipelist" 
                        element={loggedInUser ? <Recipelist /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/profile" 
                        element={loggedInUser ? <ProfilePage /> : <Navigate to="/login" />} 
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
