import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

function HomePage() {
    const [recipes, setRecipes] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/recipes');
                const data = await response.json();
                if (data.recipes && Array.isArray(data.recipes)) {
                    console.log('API Response:', data);
                    setRecipes(data.recipes);
                    setIsPending(false);
                } else {
                    setRecipes([]);
                    setIsPending(false);
                    setError('Unexpected API response format.');
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setRecipes([]);
                setIsPending(false);
                setError('Failed to fetch recipes.');
            }
        };

        fetchRecipes();
    }, []);

    const updateRecipe = async (id, updatedRecipe) => {
        try {
            const response = await fetch(`http://localhost:5000/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRecipe),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
    
            const data = await response.json();
            console.log('Updated Recipe:', data);
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) => (recipe._id === id ? data : recipe)) // Change here
            );
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update recipe.');
        }
    };
    
    const deleteRecipe = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/recipes/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
    
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id)); // Change here
        } catch (error) {
            console.error('Error deleting recipe:', error);
            setError('Failed to delete recipe.');
        }
    };
    

    const filteredRecipes = Array.isArray(recipes)
        ? recipes.filter(recipe =>
            (recipe.recipeName && recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (recipe.category && recipe.category.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        : [];

    const handleViewFullRecipe = (recipe) => {
        setSelectedRecipe(recipe === selectedRecipe ? null : recipe);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', position: 'relative' }}>
            <h1>Welcome to the Recipe App</h1>

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
                                onUpdateRecipe={updateRecipe} // Pass down update function
                                onDeleteRecipe={deleteRecipe} // Pass down delete function
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
