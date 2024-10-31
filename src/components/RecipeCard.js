import React, { useState } from 'react';

const RecipeCard = ({ recipe, user = {}, isSelected, onViewRecipe, onUpdateRecipe, onDeleteRecipe }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [successMessage, setSuccessMessage] = useState('');

    const isAdmin = user.role === 'admin';
    const isOwner = recipe.userId === user.id;

    if (!recipe || !recipe.title || !recipe.ingredients || !recipe.instructions) {
        return null; // Return null if recipe is missing required fields
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateClick = () => {
        if (isEditing) {
            if (!updatedRecipe.title || !updatedRecipe.ingredients || !updatedRecipe.instructions) {
                setSuccessMessage('Please fill in all fields.');
                setTimeout(() => setSuccessMessage(''), 4000);
                return;
            }

            onUpdateRecipe(recipe._id, updatedRecipe);
            setSuccessMessage('Recipe updated successfully!');
        } else {
            setUpdatedRecipe(recipe);
        }
        setIsEditing(!isEditing);
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const handleDeleteClick = () => {
        onDeleteRecipe(recipe._id);
        setSuccessMessage('Recipe deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
            position: 'relative',
            display: 'block'
        }}>
            <h2 style={{
                margin: '15px 0',
                fontSize: '1.5em',
                textAlign: 'center'
            }}>{recipe.title}</h2>

            {successMessage && (
                <div style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    textAlign: 'center'
                }}>
                    {successMessage}
                </div>
            )}

            <button
                onClick={() => onViewRecipe(recipe)}
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
                {isSelected ? 'Hide Details' : 'View Full Recipe'}
            </button>

            {isSelected && (
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        {isAdmin || isOwner ? (
                            <button
                                onClick={handleUpdateClick}
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#ffa500',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isEditing ? 'Save Changes' : 'Edit Recipe'}
                            </button>
                        ) : null}
                        {isAdmin || isOwner ? (
                            <button
                                onClick={handleDeleteClick}
                                style={{
                                    padding: '10px',
                                    backgroundColor: '#ff4d4d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete Recipe
                            </button>
                        ) : null}
                    </div>
                    {isEditing && (
                        <div>
                            <input
                                type="text"
                                name="title"
                                value={updatedRecipe.title}
                                onChange={handleChange}
                                placeholder="Recipe Name"
                                required
                            />
                            <textarea
                                name="ingredients"
                                value={updatedRecipe.ingredients}
                                onChange={handleChange}
                                placeholder="Ingredients"
                                required
                            />
                            <textarea
                                name="instructions"
                                value={updatedRecipe.instructions}
                                onChange={handleChange}
                                placeholder="Instructions"
                                required
                            />
                            <select
                                name="category"
                                value={updatedRecipe.category}
                                onChange={handleChange}
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                            <input
                                type="text"
                                name="preparation"
                                value={updatedRecipe.preparation}
                                onChange={handleChange}
                                placeholder="Preparation Time"
                            />
                            <input
                                type="text"
                                name="cookingTime"
                                value={updatedRecipe.cookingTime}
                                onChange={handleChange}
                                placeholder="Cooking Time"
                            />
                            <input
                                type="number"
                                name="servings"
                                value={updatedRecipe.servings}
                                onChange={handleChange}
                                placeholder="Servings"
                                required
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipeCard;
