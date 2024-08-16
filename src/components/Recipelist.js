import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Navbar from './Navbar'; 
import '../styles/Recipelist.css';

const fetchRecipes = async () => {
    const response = await fetch('http://localhost:3000/Recipe');
    if (!response.ok) throw new Error('Failed to fetch Recipe');
    return response.json();
};

const addRecipe = async (recipe) => {
    const response = await fetch('http://localhost:3000/Recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
    });
    if (!response.ok) throw new Error('Failed to add recipe');
    return response.json();
};

const deleteRecipe = async (id) => {
    const response = await fetch(`http://localhost:3000/Recipe/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
};

const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`http://localhost:3000/Recipe/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
    });
    if (!response.ok) throw new Error('Failed to update recipe');
};

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        recipeName: '',
        ingredients: '',
        instructions: '',
        category: 'Breakfast',
        preparation: '',
        time: '',
        cookingTime: '',
        servings: '',
        imageUrl: '',  
    });
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editRecipe, setEditRecipe] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                const filteredData = data.filter(recipe =>
                    recipe.recipeName.trim() !== '' &&
                    recipe.ingredients.trim() !== '' &&
                    recipe.instructions.trim() !== '' &&
                    recipe.category.trim() !== '' &&
                    recipe.preparation.trim() !== '' &&
                    recipe.cookingTime.trim() !== '' &&
                    recipe.servings.trim() !== ''
                );
                setRecipes(filteredData);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        getRecipes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prev) => ({ ...prev, [name]: value }));
        if (editRecipeId !== null) {
            setEditRecipe((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        try {
            const addedRecipe = await addRecipe(newRecipe);
            if (
                newRecipe.recipeName.trim() !== '' &&
                newRecipe.ingredients.trim() !== '' &&
                newRecipe.instructions.trim() !== '' &&
                newRecipe.category.trim() !== '' &&
                newRecipe.preparation.trim() !== '' &&
                newRecipe.cookingTime.trim() !== '' &&
                newRecipe.servings.trim() !== ''
            ) {
                setRecipes((prev) => [...prev, addedRecipe]);
            }
            setNewRecipe({
                recipeName: '',
                ingredients: '',
                instructions: '',
                category: 'Breakfast',
                preparation: '',
                time: '',
                cookingTime: '',
                servings: '',
                imageUrl: '', 
            });
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleDeleteRecipe = async (id) => {
        try {
            await deleteRecipe(id);
            setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleEditRecipe = (recipe) => {
        setEditRecipeId(recipe.id);
        setEditRecipe(recipe);
        // Scroll to the update form
        setTimeout(() => {
            const updateForm = document.getElementById('update-form');
            if (updateForm) {
                updateForm.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };

    const handleUpdateRecipe = async (e) => {
        e.preventDefault();
        try {
            await updateRecipe(editRecipeId, editRecipe);
            setRecipes((prev) => prev.map((recipe) => (recipe.id === editRecipeId ? editRecipe : recipe)));
            setEditRecipeId(null);
            setEditRecipe({});
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); 
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.navbarContainer}>
                <Navbar />
            </div>

            <section>
                <h1>Recipe List</h1>
                <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

                {editRecipeId === null && (
                    <form onSubmit={handleAddRecipe}>
                        <input
                            type="text"
                            name="recipeName"
                            placeholder="Recipe Name"
                            value={newRecipe.recipeName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="ingredients"
                            placeholder="Ingredients"
                            value={newRecipe.ingredients}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="instructions"
                            placeholder="Instructions"
                            value={newRecipe.instructions}
                            onChange={handleChange}
                        />
                        <select
                            name="category"
                            value={newRecipe.category}
                            onChange={handleChange}
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                        <input
                            type="text"
                            name="preparation"
                            placeholder="Preparation"
                            value={newRecipe.preparation}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="time"
                            placeholder="Time"
                            value={newRecipe.time}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="cookingTime"
                            placeholder="Cooking Time"
                            value={newRecipe.cookingTime}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="servings"
                            placeholder="Servings"
                            value={newRecipe.servings}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={newRecipe.imageUrl}
                            onChange={handleChange}
                        />
                        <button type="submit">Add Recipe</button>
                    </form>
                )}

                {/* Show Update Recipe form only if editRecipeId is set */}
                {editRecipeId && (
                    <form id="update-form" onSubmit={handleUpdateRecipe}>
                        <input
                            type="text"
                            name="recipeName"
                            placeholder="Recipe Name"
                            value={editRecipe.recipeName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="ingredients"
                            placeholder="Ingredients"
                            value={editRecipe.ingredients}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="instructions"
                            placeholder="Instructions"
                            value={editRecipe.instructions}
                            onChange={handleChange}
                        />
                        <select
                            name="category"
                            value={editRecipe.category}
                            onChange={handleChange}
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                        <input
                            type="text"
                            name="preparation"
                            placeholder="Preparation"
                            value={editRecipe.preparation}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="time"
                            placeholder="Time"
                            value={editRecipe.time}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="cookingTime"
                            placeholder="Cooking Time"
                            value={editRecipe.cookingTime}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="servings"
                            placeholder="Servings"
                            value={editRecipe.servings}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={editRecipe.imageUrl}
                            onChange={handleChange}
                        />
                        <button type="submit">Update Recipe</button>
                    </form>
                )}

                <ul>
                    {filteredRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <h2>{recipe.recipeName}</h2>
                            <p>Ingredients: {recipe.ingredients}</p>
                            <p>Instructions: {recipe.instructions}</p>
                            <p>Category: {recipe.category}</p>
                            <p>Preparation: {recipe.preparation}</p>
                            <p>Time: {recipe.time}</p>
                            <p>Cooking Time: {recipe.cookingTime}</p>
                            <p>Servings: {recipe.servings}</p>
                            <img src={recipe.imageUrl} alt={recipe.recipeName} style={{ width: '100px', height: '100px' }} />
                            <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
                            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        width: '100%',
    },
    navbarContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: '10px', // Adjust as needed
    },
};

export default RecipeList;
