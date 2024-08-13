import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/users/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleRecipeClick = () => {
        navigate('/recipelist');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/registration');
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Recipe App</h1>
            {isLoggedIn ? (
                <div>
                    <p>Hello, {userData?.name || 'User'}!</p>
                    <p>Enjoy browsing our recipes.</p>
                    <div>
                        <button onClick={handleProfileClick} style={{ margin: '10px' }}>
                            Go to Profile
                        </button>
                        <button onClick={handleRecipeClick} style={{ margin: '10px' }}>
                            View Recipes
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Please <button onClick={handleLoginClick} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}>log in</button> or <button onClick={handleRegisterClick} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}>register</button> to access more features.</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;
