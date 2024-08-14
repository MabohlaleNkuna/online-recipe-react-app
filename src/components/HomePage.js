import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import Button from './Button';

function HomePage() {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
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

        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3000/Recipe');
                if (!response.ok) throw new Error('Failed to fetch recipes');
                const data = await response.json();
                setRecipes(data);
                setIsPending(false);
            } catch (error) {
                setError(error.message);
                setIsPending(false);
            }
        };
        fetchRecipes();
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/registration');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewFullRecipe = (recipe) => {
        if (isLoggedIn) {
            setSelectedRecipe(recipe === selectedRecipe ? null : recipe);
        } else {
            alert('Please log in or register to view the full recipe details.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Navbar */}
            <nav style={{ backgroundColor: '#004aad', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={handleProfileClick} label="Profile" style={{ background: 'none', color: 'white' }} />
                {isLoggedIn ? (
                    <Button onClick={handleLogoutClick} label="Logout" style={{ background: 'none', color: 'white' }} />
                ) : (
                    <div>
                        <Button onClick={handleLoginClick} label="Login" style={{ background: 'none', color: 'white' }} />
                        <Button onClick={handleRegisterClick} label="Register" style={{ background: 'none', color: 'white' }} />
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <h1>Welcome to the Recipe App</h1>
            {isLoggedIn ? (
                <div>
                    <p>Hello, {userData?.name || 'User'}!</p>
                    <p>Enjoy browsing our recipes.</p>
                </div>
            ) : (
                <div>
                    <p>
                        Please{' '}
                        <Button
                            onClick={handleLoginClick}
                            label="log in"
                            style={{
                                color: 'blue',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        />{' '}
                        or{' '}
                        <Button
                            onClick={handleRegisterClick}
                            label="register"
                            style={{
                                color: 'blue',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        />{' '}
                        to access more features.
                    </p>
                </div>
            )}
            <div style={{ marginTop: '40px' }}>
                <h2>Search and Browse Recipes</h2>
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '20px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                {isPending ? (
                    <p>Loading recipes...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {filteredRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isSelected={selectedRecipe === recipe}
                                onViewRecipe={handleViewFullRecipe}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
