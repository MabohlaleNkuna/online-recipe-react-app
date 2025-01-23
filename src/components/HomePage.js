import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import Button from './Button';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

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

    const handleNavigateToRecipeList = () => {
        navigate('/recipelist');
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
        <div style={{ textAlign: 'center', padding: '20px', position: 'relative' }}>
            {isLoggedIn && (
                <FontAwesomeIcon
                    icon={faUser}
                    onClick={() => navigate('/profile')}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        cursor: 'pointer',
                        fontSize: '30px',
                        color: '#004aad',
                        zIndex: 1000,
                    }}
                />
            )}

            {isLoggedIn && (
                <FontAwesomeIcon
                    icon={faPlus}
                    onClick={handleNavigateToRecipeList}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        cursor: 'pointer',
                        fontSize: '50px',
                        color: '#004aad',
                        zIndex: 1000,
                        animation: 'pulse 1.5s infinite',
                    }}
                    title="Add or Edit Recipes"
                />
            )}

            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
                `}
            </style>

            <h1>Welcome to the Recipe App</h1>
            {isLoggedIn ? (
                <div>
                    <p>Hello, {userData?.name || 'User'}!</p>
                    <p>Enjoy browsing our recipes.</p>
                    <p style={{ color: '#004aad', fontSize: '18px', fontWeight: 'bold' }}>
                        Click the <FontAwesomeIcon icon={faPlus} style={{ fontSize: '20px', color: '#004aad' }} /> icon below to add new recipes!
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        Please{' '}
                        <Button
                            onClick={() => navigate('/login')}
                            label="log in"
                            style={{
                                color: 'blue',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        />{' '}
                        or{' '}
                        <Button
                            onClick={() => navigate('/registration')}
                            label="register"
                            style={{
                                color: 'blue',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        />{' '}
                        to access more features.
                    </p>
                </div>
            )}

            <div style={{ marginTop: '40px' }}>
                <h2>Search and Browse Recipes</h2>
                <SearchBar
                    searchQuery={searchTerm}
                    handleSearchChange={(e) => setSearchTerm(e.target.value)}
                />
                {isPending ? (
                    <p>Loading recipes...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '20px',
                        }}
                    >
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
