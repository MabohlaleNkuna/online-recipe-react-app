import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !password || !email) {
            setError('Please fill in all required fields.');
            return;
        }

        const userData = { username, password, email };

        await sendUserData(userData);
    };

    const sendUserData = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Failed to register user.');

            setSuccessMessage('Registration successful!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={{ marginBottom: '20px', color: '#black' }}>Register</h2>
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #F4C561, #004AAD)',
        color: '#FFF',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#FFF',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#241D10',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    },
    input: {
        width: '100%',
        padding: '0.8rem',
        margin: '0.5rem 0',
        borderRadius: '4px',
        border: 'none',
        fontSize: '1rem',
    },
    button: {
        padding: '0.8rem 2rem',
        marginTop: '1rem',
        fontSize: '1rem',
        color: '#FFF',
        backgroundColor: '#F4C561',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#DAA050',
    },
    error: {
        color: '#ff4d4d',
        marginBottom: '1rem',
    },
    success: {
        color: '#3CB371',
        marginBottom: '1rem',
    },
};

export default Registration;
