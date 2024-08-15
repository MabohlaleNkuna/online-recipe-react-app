import React from 'react';

function RecipeCard({ recipe, isSelected, onViewRecipe, isLoggedIn }) {
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
                <img
                    src={recipe.imageUrl}
                    alt={recipe.recipeName}
                    style={{
                        width: isSelected ? '250px' : '100%',
                        height: isSelected ? '200px' : '250px',
                        objectFit: 'cover',
                        borderRadius: isSelected ? '50%' : '10px'
                    }}
                />
            </div>
            <h2 style={{
                margin: '15px 0',
                fontSize: '1.5em',
                textAlign: 'center'
            }}>{recipe.recipeName}</h2>
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
                {isLoggedIn
                    ? (isSelected ? 'Hide Details' : 'View Full Recipe')
                    : 'Sign in to view details'}
            </button>
            {isSelected && isLoggedIn && (
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
                    <button onClick={() => onViewRecipe(null)} style={{ marginTop: '20px', backgroundColor: '#ff4d4d', color: 'white' }}>
                        Close Details
                    </button>
                </div>
            )}
            {isSelected && !isLoggedIn && (
                <div style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    borderTop: '1px solid #ddd',
                    paddingTop: '20px'
                }}>
                    <p>
                        Please <button onClick={() => onViewRecipe(null)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}>log in</button> or <button onClick={() => onViewRecipe(null)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}>register</button> to view full recipe details.
                    </p>
                </div>
            )}
        </div>
    );
}

export default RecipeCard;
