import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const handleRecipeClick = () => {
        navigate('/recipelist');
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
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewFullRecipe = (recipe) => {
        setSelectedRecipe(recipe === selectedRecipe ? null : recipe);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
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
                        <button
                            onClick={handleLoginClick}
                            style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            log in
                        </button>{' '}
                        or{' '}
                        <button
                            onClick={handleRegisterClick}
                            style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            register
                        </button>{' '}
                        to access more features.
                    </p>
                </div>
            )}
            <div style={{ marginTop: '40px' }}>
                <h2>Search and Browse Recipes</h2>
                <input
                    type="text"
                    placeholder="Search for a recipe..."
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
                            (selectedRecipe === null || selectedRecipe === recipe) && (
                                <div key={recipe.id} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'left',
                                    position: 'relative'
                                }}>
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
    <img
        src={recipe.imageUrl}
        alt={recipe.recipeName}
        style={{
            width: selectedRecipe === recipe ? '250px' : '100%',
            height: selectedRecipe === recipe ? '200px' : '250px',
            objectFit: 'cover',
            borderRadius: selectedRecipe === recipe ? '50%' : '10px'
        }}
    />
</div>

                                    <h2 style={{
                                        margin: '15px 0',
                                        fontSize: '1.5em',
                                        textAlign: 'center'
                                    }}>{recipe.recipeName}</h2>
                                    <button
                                        onClick={() => handleViewFullRecipe(recipe)}
                                        style={{
                                            display: 'block',
                                            margin: '10px auto',
                                            padding: '10px',
                                            backgroundColor: '#004aad',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {selectedRecipe === recipe ? 'Hide Details' : 'View Full Recipe'}
                                    </button>

                                    {/* Displaying recipe details if recipe is selected */}
                                    {selectedRecipe === recipe && (
                                        <div style={{
                                            marginTop: '20px',
                                            textAlign: 'left',
                                            borderTop: '1px solid #ddd',
                                            paddingTop: '20px'
                                        }}>
                                            <h2>Recipe Details</h2>
                                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                            <p><strong>Category:</strong> {recipe.category}</p>
                                            <p><strong>Preparation Time:</strong> {recipe.preparation}</p>
                                            <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
                                            <p><strong>Servings:</strong> {recipe.servings}</p>
                                            <button onClick={() => setSelectedRecipe(null)} style={{ marginTop: '20px', backgroundColor: '#ff4d4d', color: 'white' }}>
                                                Close Details
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
