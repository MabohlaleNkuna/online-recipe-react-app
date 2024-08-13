import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in on component mount
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        // Redirect based on login state
        if (isLoggedIn) {
            navigate('/recipelist'); // Redirect to Recipelist page if logged in
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Replace with actual API call if needed
            const response = await fetch('http://localhost:3000/users?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
            const data = await response.json();

            if (data.length > 0) {
                localStorage.setItem('userId', data[0].id); // Store user ID
                localStorage.setItem('username', username); // Optionally store username
                setIsLoggedIn(true);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred');
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleRecipeClick = () => {
        navigate('/recipelist');
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Login</h2>
            {!isLoggedIn ? (
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
            ) : (
                <div>
                    <p>Logged in successfully!</p>
                    <button onClick={handleProfileClick} style={{ margin: '10px' }}>
                        Go to Profile
                    </button>
                    <button onClick={handleRecipeClick} style={{ margin: '10px' }}>
                        View Recipes
                    </button>
                    <button onClick={handleLogout} style={{ margin: '10px' }}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
