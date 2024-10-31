import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setUserData({ username: data.username, email: data.email });
                } else {
                    setError('Failed to load user data');
                }
            } catch (error) {
                setError('An error occurred. Please try again.');
            }
        };
        if (userId) fetchUserData();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                setSuccessMessage('Profile updated successfully!');
                setIsEditing(false);
            } else {
                setError('Failed to update profile');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                localStorage.clear();
                navigate('/register');
            } else {
                setError('Failed to delete profile');
            }
        } catch (error) {
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
                <img 
                    src="https://via.placeholder.com/100?text=Profile+Icon" 
                    alt="Profile Icon" 
                    style={{ borderRadius: '50%', marginBottom: '20px' }}
                />
                <h2 style={{ marginBottom: '20px', color: '#FFFFFF' }}>Profile</h2>
                
                {error && <p style={{ color: '#F05D5E', marginBottom: '10px' }}>{error}</p>}
                {successMessage && <p style={{ color: '#A6E3A1', marginBottom: '10px' }}>{successMessage}</p>}
                
                {!isEditing ? (
                    <div>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <button 
                            onClick={() => setIsEditing(true)} 
                            style={buttonStyle}
                        >
                            Update
                        </button>
                        <button 
                            onClick={handleDelete} 
                            style={{ ...buttonStyle, backgroundColor: '#F05D5E', marginTop: '10px' }}
                        >
                            Delete Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <button type="submit" style={buttonStyle}>Save Changes</button>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            style={{ ...buttonStyle, backgroundColor: '#AAAAAA', marginTop: '10px' }}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#F4C561',
    border: 'none',
    borderRadius: '4px',
    color: '#004AAD',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

export default Profile;
