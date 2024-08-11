import React, { useState, useEffect } from 'react';

const fetchRecipes = async () => {
    const response = await fetch('http://localhost:4000/Recipe');
    if (!response.ok) throw new Error('Failed to fetch Recipe');
    return response.json();
};

const addRecipe = async (recipe) => {
    const response = await fetch('http://localhost:4000/Recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
    });
    if (!response.ok) throw new Error('Failed to add recipe');
    return response.json();
};

const deleteRecipe = async (id) => {
    const response = await fetch(`http://localhost:4000/Recipe/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
};

const updateRecipe = async (id, updatedRecipe) => {
    const response = await fetch(`http://localhost:4000/Recipe/${id}`, {
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
        category: 'Breakfast', // Default category
        preparation: '',
        time: '',
        cookingTime: '',
        servings: '',
    });
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editRecipe, setEditRecipe] = useState({});

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                // Filter out recipes with empty fields
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
                category: 'Breakfast', // Reset to default category
                preparation: '',
                time: '',
                cookingTime: '',
                servings: '',
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

    return (
        <>
            <section>
                <section>
                    <h1>Recipe List</h1>
                </section>
                <section>
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
                        <button type="submit">Add Recipe</button>
                    </form>
                </section>
                <section>
                    {editRecipeId !== null && (
                        <form onSubmit={handleUpdateRecipe}>
                            <input
                                type="text"
                                name="recipeName"
                                placeholder="Recipe Name"
                                value={editRecipe.recipeName || ''}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="ingredients"
                                placeholder="Ingredients"
                                value={editRecipe.ingredients || ''}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="instructions"
                                placeholder="Instructions"
                                value={editRecipe.instructions || ''}
                                onChange={handleChange}
                            />
                            <select
                                name="category"
                                value={editRecipe.category || 'Breakfast'}
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
                                value={editRecipe.preparation || ''}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="time"
                                placeholder="Time"
                                value={editRecipe.time || ''}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="cookingTime"
                                placeholder="Cooking Time"
                                value={editRecipe.cookingTime || ''}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="servings"
                                placeholder="Servings"
                                value={editRecipe.servings || ''}
                                onChange={handleChange}
                            />
                            <button type="submit">Update Recipe</button>
                        </form>
                    )}
                </section>
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>Recipe Name</th>
                                <th>Ingredients</th>
                                <th>Instructions</th>
                                <th>Category</th>
                                <th>Preparation</th>
                                <th>Time</th>
                                <th>Cooking Time</th>
                                <th>Servings</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe) => (
                                <tr key={recipe.id}>
                                    <td>{recipe.recipeName}</td>
                                    <td>{recipe.ingredients}</td>
                                    <td>{recipe.instructions}</td>
                                    <td>{recipe.category}</td>
                                    <td>{recipe.preparation}</td>
                                    <td>{recipe.time}</td>
                                    <td>{recipe.cookingTime}</td>
                                    <td>{recipe.servings}</td>
                                    <td>
                                        <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
                                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </>
    );
};

export default RecipeList;
