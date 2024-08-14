import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';

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

    return (
        <div className="profile-page">
            <div className="profile-picture">
                <img src={userData.profilePicture || 'default-profile-pic-url'} alt="Profile" width="100" height="100" />
            </div>
            <div className="profile-content">
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Surname:</strong> {userData.surname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <button onClick={() => setIsEditing(true)} className="button">Update Profile</button>
                <button onClick={handleDeleteProfile} className="button delete-button">Delete Profile</button>
            </div>

            {/* Modal for updating profile */}
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
                    <input type="file" onChange={handleProfilePictureChange} />
                </div>
                <button onClick={handleUpdateProfile} className="button">Save Changes</button>

                <h3>Change Password</h3>
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
                <button onClick={handleUpdatePassword} className="button">Change Password</button>
            </Modal>
        </div>
    );
}

export default ProfilePage;
