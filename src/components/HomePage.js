import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import RecipeForm from './RecipeForm';
import Button from './Button';

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        recipeName: '',
        ingredients: '',
        instructions: '',
        category: '',
        preparation: '',
        cookingTime: '',
        servings: '',
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3000/Recipe');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRecipes(data);
                    setIsPending(false);
                } else {
                    setRecipes([]);
                    setIsPending(false);
                }
            } catch (error) {
                setRecipes([]);
                setIsPending(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(
        (recipe) =>
            recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            style={{
                textAlign: 'center',
                padding: '20px',
                position: 'relative',
                minHeight: '100vh',
            }}
        >
            <Navbar />

            <div className="container mt-5" style={{ background: 'linear-gradient(to right, #F4C561, #004AAD)', borderRadius: '10px', padding: '20px' }}>
                <h1>Welcome to the Recipe App</h1>

                <div className="mt-4">
                    <h2>Search and Browse Recipes</h2>
                    <SearchBar
                        searchQuery={searchTerm}
                        handleSearchChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="mt-3">
                        <Button
                            onClick={() => setIsAddRecipeOpen(!isAddRecipeOpen)}
                            label={isAddRecipeOpen ? 'Cancel' : 'Add New Recipe'}
                            className="btn btn-primary"
                        />
                    </div>

                    <RecipeForm
                        newRecipe={newRecipe}
                        handleAddRecipeChange={(e) => setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value })}
                        handleAddRecipeSubmit={(e) => {
                            e.preventDefault();
                            // add recipe functionality
                        }}
                        isAddRecipeOpen={isAddRecipeOpen}
                        setIsAddRecipeOpen={setIsAddRecipeOpen}
                    />

                    {isPending ? (
                        <p>Loading recipes...</p>
                    ) : (
                        <div className="row mt-4">
                            {filteredRecipes.map((recipe) => (
                                <div className="col-md-4 mb-4" key={recipe._id}>
                                    <RecipeCard
                                        recipe={recipe}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
