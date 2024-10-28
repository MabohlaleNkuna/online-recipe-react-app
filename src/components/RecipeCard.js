import React, { useState } from 'react';

const RecipeCard = ({ recipe, isSelected, onViewRecipe, onUpdateRecipe, onDeleteRecipe }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [successMessage, setSuccessMessage] = useState(''); 

    if (!recipe || !recipe.recipeName || !recipe.ingredients || !recipe.instructions) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateClick = () => {
        if (isEditing) {
            onUpdateRecipe(recipe._id, updatedRecipe); 
            setSuccessMessage('Recipe updated successfully!'); 
            // Clear message after 4 seconds
            setTimeout(() => setSuccessMessage(''), 4000);
        } else {
            setUpdatedRecipe(recipe); 
        }
        setIsEditing(!isEditing); 
    };

    const handleDeleteClick = () => {
        onDeleteRecipe(recipe._id); 
        setSuccessMessage('Recipe deleted successfully!');
        // Clear message after 4 seconds
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
            }}>{recipe.recipeName}</h2>

            {/* Success message display */}
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
                    </div>
                    {isEditing && (
                        <div>
                            <input
                                type="text"
                                name="recipeName"
                                value={updatedRecipe.recipeName}
                                onChange={handleChange}
                                placeholder="Recipe Name"
                            />
                            <textarea
                                name="ingredients"
                                value={updatedRecipe.ingredients}
                                onChange={handleChange}
                                placeholder="Ingredients"
                            />
                            <textarea
                                name="instructions"
                                value={updatedRecipe.instructions}
                                onChange={handleChange}
                                placeholder="Instructions"
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
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

RecipeCard.defaultProps = {
    onUpdateRecipe: () => {},
    onDeleteRecipe: () => {},
};

export default RecipeCard;
