import React, { useState, useEffect } from 'react';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({
        recipeName: 'Sample Recipe',
        imageUrl: 'https://via.placeholder.com/300',
        ingredients: 'Sample ingredients',
        instructions: 'Sample instructions',
        category: 'Sample category',
        preparation: 'Sample preparation time',
        cookingTime: 'Sample cooking time',
        servings: 'Sample servings'
    });
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        // If you have some API logic, you can add it here, otherwise it can be omitted.
        // Set isPending to false once data is fetched if you choose to include API logic.
        setIsPending(false);
    }, []);

    if (isPending) return <p>Loading recipe details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Recipe Details</h1>
            <h2>{recipe.recipeName}</h2>
            <img
                src={recipe.imageUrl}
                alt={recipe.recipeName}
                style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                }}
            />
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Preparation Time:</strong> {recipe.preparation}</p>
            <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
        </div>
    );
};

export default RecipeDetails;
