import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleViewRecipe = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div className="card">
            <div className="card-body">
                <img
                    src={recipe.imageUrl}
                    alt={recipe.recipeName}
                    className="recipe-image mb-3"
                />
                <h5 className="card-title">{recipe.recipeName}</h5>

                <button onClick={handleViewRecipe} className="btn btn-primary d-block mx-auto my-3">
                    {isSelected ? 'Hide Details' : 'View Full Recipe'}
                </button>

                {isSelected && (
                    <div className="recipe-details mt-3">
                        <h6>Recipe Details</h6>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <p><strong>Category:</strong> {recipe.category}</p>

                        <div className="mt-3">
                            <button className="btn btn-secondary mr-2">Login</button>
                            <button className="btn btn-warning">Edit/Update Recipe</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;
