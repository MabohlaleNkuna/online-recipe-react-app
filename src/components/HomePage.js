import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import RecipeForm from './RecipeForm'; 
import Button from './Button';

function HomePage() {
    const [recipes, setRecipes] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        recipeName: '',
        ingredients: '',
        instructions: '',
        category: '',
        preparation: '',
        cookingTime: '',
        servings: ''
    });
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/recipes');
                const data = await response.json();
                if (data.recipes && Array.isArray(data.recipes)) {
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
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) => (recipe._id === id ? data : recipe))
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

            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
            setError('Failed to delete recipe.');
        }
    };

    /*const addRecipe = async (newRecipe) => {
        try {
            const response = await fetch('http://localhost:5000/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            const addedRecipe = await response.json();
            setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
            setIsAddRecipeOpen(false);
            setNewRecipe({
                recipeName: '',
                ingredients: '',
                instructions: '',
                category: '',
                preparation: '',
                cookingTime: '',
                servings: ''
            });
            setSuccessMessage('Recipe added successfully!'); 
            setTimeout(() => setSuccessMessage(''), 3000); 
        } catch (error) {
            console.error('Error adding recipe:', error);
            setError('Failed to add recipe.');
        }
    };*/
    const addRecipe = async (newRecipe) => {
        try {
            const response = await fetch('http://localhost:5000/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            const addedRecipe = await response.json();
            setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
            setIsAddRecipeOpen(false);
            setNewRecipe({
                recipeName: '',
                ingredients: '',
                instructions: '',
                category: '',
                preparation: '',
                cookingTime: '',
                servings: ''
            });
            setSuccessMessage('Recipe added successfully!'); 
            setTimeout(() => setSuccessMessage(''), 3000); 
        } catch (error) {
            console.error('Error adding recipe:', error);
            setError('Failed to add recipe.');
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

    const handleAddRecipeChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRecipeSubmit = (e) => {
        e.preventDefault();
        addRecipe(newRecipe);
    };

    return (
        <div 
            style={{ 
                textAlign: 'center', 
                padding: '20px', 
                position: 'relative', 
                minHeight: '100vh',
                background: 'linear-gradient(to right, #F4C561, #004AAD)' 
            }}
        >
            <h1>Welcome to the Recipe App</h1>
    
            <div style={{ marginTop: '40px' }}>
                <h2>Search and Browse Recipes</h2>
                <SearchBar
                    searchQuery={searchTerm}
                    handleSearchChange={(e) => setSearchTerm(e.target.value)}
                />
               
               <div style={{ margin: '20px 0' }}>
                    <Button 
                        onClick={() => setIsAddRecipeOpen(!isAddRecipeOpen)}
                        label={isAddRecipeOpen ? 'Cancel' : 'Add New Recipe'}
                        width="400px"
                        style={{ maxWidth: '400px' }} 
                    />
                </div>
    
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}

                <RecipeForm 
                    newRecipe={newRecipe}
                    handleAddRecipeChange={handleAddRecipeChange}
                    handleAddRecipeSubmit={handleAddRecipeSubmit}
                    isAddRecipeOpen={isAddRecipeOpen}
                    setIsAddRecipeOpen={setIsAddRecipeOpen}
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
                                key={recipe._id}
                                recipe={recipe}
                                isSelected={selectedRecipe === recipe}
                                onViewRecipe={handleViewFullRecipe}
                                onUpdateRecipe={updateRecipe}
                                onDeleteRecipe={deleteRecipe}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}
export default HomePage;
