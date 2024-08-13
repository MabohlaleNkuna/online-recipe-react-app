import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Recipe/${id}`);
                if (!response.ok) throw new Error('Failed to fetch recipe');
                const data = await response.json();
                setRecipe(data);
                setIsPending(false);
            } catch (error) {
                setError(error.message);
                setIsPending(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (isPending) return <p>Loading recipe details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {recipe && (
                <>
                    <h1>Recipe {recipe.id} Details</h1>
                    <h2>{recipe.recipeName}</h2>
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Category:</strong> {recipe.category}</p>
                    <p><strong>Preparation Time:</strong> {recipe.preparation}</p>
                    <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;
