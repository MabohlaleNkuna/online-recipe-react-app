import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            if (data.length > 0 && data[0].password === password) {
                localStorage.setItem('userId', data[0].id);
                localStorage.setItem('email', email);
                window.dispatchEvent(new Event('email'));
                navigate('/');
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
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <p>
                Don't have an account? <Link to="/registration">Create an account</Link>
            </p>
        </div>
    );
};

export default Login;
