import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/'); 
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch(`http://localhost:3000/users?username=${encodeURIComponent(username)}`);
            const data = await response.json();

            if (data.length > 0 && data[0].password === password) {
                localStorage.setItem('userId', data[0].id); 
                localStorage.setItem('username', username); 
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.'); 
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', margin: '10px auto' }}
                    required 
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', margin: '10px auto' }}
                    required 
                />
                <button type="submit" style={{ display: 'block', margin: '10px auto' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
