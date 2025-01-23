import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/ProfilePage.css';
import { FaHome } from 'react-icons/fa';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                {children}
            </div>
        </div>
    );
}

function ProfilePage() {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        profilePicture: '',
        username: '',
        password: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newData, setNewData] = useState({
        name: '',
        surname: '',
        email: '',
        profilePicture: '',
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                        setNewData({
                            name: data.name,
                            surname: data.surname,
                            email: data.email,
                            profilePicture: data.profilePicture,
                        });
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...userData,
                        ...newData,
                        password: newPassword || userData.password,
                    }),
                });
                if (response.ok) {
                    alert('Profile updated successfully');
                    setUserData(prev => ({
                        ...prev,
                        ...newData,
                        password: newPassword || prev.password,
                    }));
                    setIsEditing(false);
                } else {
                    alert('Failed to update profile');
                }
            } catch (error) {
                alert('Error updating profile:', error);
            }
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...userData,
                        password: newPassword,
                    }),
                });
                if (response.ok) {
                    alert('Password updated successfully');
                    setNewPassword('');
                    setConfirmPassword('');
                } else {
                    alert('Failed to update password');
                }
            } catch (error) {
                alert('Error updating password:', error);
            }
        }
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewData({ ...newData, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteProfile = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Profile deleted successfully');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('username');
                    window.location.href = '/';
                } else {
                    alert('Failed to delete profile');
                }
            } catch (error) {
                alert('Error deleting profile:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.dispatchEvent(new Event('username')); 
        navigate('/');
    };

    const handleNavigateToRecipeList = () => {
        navigate('/recipelist');
    };

    return (
        <div className="profile-page container mt-5">
            <div className="home-icon position-absolute top-0 end-0 p-3" onClick={() => navigate('/')}>
                <FaHome size={30} />
            </div>
            <div className="profile-picture text-center mb-4">
                <img src={userData.profilePicture || 'default-profile-pic-url'} alt="Profile" className="img-fluid rounded-circle" />
            </div>
            <div className="profile-content text-center">
                <h2>{userData.username}</h2>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Surname:</strong> {userData.surname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <Button onClick={() => setIsEditing(true)} label="Update Profile" color="#004AAD" />
                <Button onClick={handleDeleteProfile} label="Delete Profile" color="#FF0000" />
                <Button onClick={handleLogout} label="Logout" color="#FF0000" />
            </div>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <h3>Update Profile</h3>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={newData.surname}
                        onChange={(e) => setNewData({ ...newData, surname: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={newData.email}
                        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button onClick={() => { handleUpdateProfile(); handleUpdatePassword(); }} label="Save Changes" color="#004AAD" />
            </Modal>
        </div>
    );
}

export default ProfilePage;
