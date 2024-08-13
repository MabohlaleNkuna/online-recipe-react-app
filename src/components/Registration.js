import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (username && password && name && surname && email && profilePicture) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const profilePictureBase64 = reader.result;
                
                const userData = {
                    username,
                    password,
                    name,
                    surname,
                    email,
                    profilePicture: profilePictureBase64,
                };

                try {
                    const response = await fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to register user.');
                    }

                    navigate('/login');
                } catch (error) {
                    setError(error.message); 
                }
            };
            reader.readAsDataURL(profilePicture);
        } else {
            setError('Please fill in all fields and upload a profile picture.'); 
        }
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    return (
        <div>
            <h2>Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;
