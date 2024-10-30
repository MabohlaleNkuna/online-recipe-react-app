import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/home'); 
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccessMessage(''); // Clear success message on new login attempt

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save user ID and token in local storage
                localStorage.setItem('userId', data._id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email); 

                setSuccessMessage('Login successful! Redirecting to homepage...'); // Set success message
                setTimeout(() => {
                    navigate('/home'); // Redirect to home page after a delay
                }, 2000); // 2 seconds delay
            } else {
                setError(data.message || 'Invalid credentials');
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
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
