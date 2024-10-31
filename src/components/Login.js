import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
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
        setSuccessMessage('');

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
                localStorage.setItem('userId', data._id);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email); 

                setSuccessMessage('Login successful! Redirecting to homepage...');
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                background: 'linear-gradient(to right, #F4C561, #004AAD)', 
                color: '#FFFFFF'
            }}
        >
            <div style={{ 
                padding: '30px', 
                maxWidth: '400px', 
                width: '100%', 
                backgroundColor: '#241D10', 
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#black' }}>Login</h2>
                {error && <p style={{ color: '#F05D5E', marginBottom: '10px' }}>{error}</p>}
                {successMessage && <p style={{ color: '#A6E3A1', marginBottom: '10px' }}>{successMessage}</p>}
                
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px' 
                        }}
                        required 
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px' 
                        }}
                        required 
                    />
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            backgroundColor: '#F4C561', 
                            border: 'none', 
                            borderRadius: '4px', 
                            color: '#004AAD', 
                            fontWeight: 'bold',
                            cursor: 'pointer' 
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
