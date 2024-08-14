import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in on component mount
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Replace with actual API call if needed
            const response = await fetch('http://localhost:3000/users?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
            const data = await response.json();

            if (data.length > 0) {
                localStorage.setItem('userId', data[0].id); // Store user ID
                localStorage.setItem('username', username); // Optionally store username
                navigate('/'); // Redirect to home on successful login
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', margin: '10px auto' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', margin: '10px auto' }}
                />
                <button type="submit" style={{ display: 'block', margin: '10px auto' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
