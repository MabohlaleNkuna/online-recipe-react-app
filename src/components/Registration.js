import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './Button';

const Registration = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password && name && surname && email && profilePicture) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const profilePictureBase64 = reader.result;
                const userData = {
                    name,
                    surname,
                    password,
                    name,
                    surname,
                    email,
                    profilePicture: profilePictureBase64,
                };

                try {
                    const response = await fetch('http://localhost:5000/users', {
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleRegister} className="border p-4 shadow rounded bg-light">
            <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
               
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="d-grid">
                    <Button onClick={handleRegister} label="Register" color="#004aad" textColor="#ffffff" />
                </div>
            </form>
            <p className="text-center mt-3">
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
};

export default Registration;
