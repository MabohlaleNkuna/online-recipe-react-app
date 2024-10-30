import React from 'react';
import Button from './Button';

const RecipeForm = ({ newRecipe, handleAddRecipeChange, handleAddRecipeSubmit, isAddRecipeOpen, setIsAddRecipeOpen }) => {
    return (
        isAddRecipeOpen && (
            <form onSubmit={handleAddRecipeSubmit} style={styles.form}>
                <h2 style={styles.title}>Add a New Recipe</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Name"
                    value={newRecipe.recipeName}
                    onChange={handleAddRecipeChange}
                    required
                    style={styles.input}
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleAddRecipeChange}
                    required
                    style={styles.textareaSmall}
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={newRecipe.instructions}
                    onChange={handleAddRecipeChange}
                    required
                    style={styles.textareaSmall}
                />
                <select
                    name="category"
                    value={newRecipe.category}
                    onChange={handleAddRecipeChange}
                    style={styles.select}
                >
                    <option>Select</option>

                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <input
                    type="text"
                    name="preparation"
                    placeholder="Preparation Time"
                    value={newRecipe.preparation}
                    onChange={handleAddRecipeChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="cookingTime"
                    placeholder="Cooking Time"
                    value={newRecipe.cookingTime}
                    onChange={handleAddRecipeChange}
                    style={styles.input}
                />
                <input
                    type="number"
                    name="servings"
                    placeholder="Servings"
                    value={newRecipe.servings}
                    onChange={handleAddRecipeChange}
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <Button 
                        type="submit" 
                        label="Add Recipe" 
                        textColor="#ffffff" 
                        style={styles.submitButton} 
                    />
                    <Button 
                        type="button" 
                        onClick={() => setIsAddRecipeOpen(false)} 
                        label="Cancel" 
                        color="#dc3545" 
                        textColor="#ffffff" 
                        style={styles.cancelButton} 
                    />
                </div>
            </form>
        )
    );
};

const styles = {
    form: {
        margin: '20px auto',
        textAlign: 'left',
        maxWidth: '450px',
        padding: '15px 20px', 
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #f4c561, #ffffff)',
    },
    title: {
        marginBottom: '10px',
        fontSize: '22px',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: 'calc(100% - 20px)', 
        padding: '8px',
        marginBottom: '8px',
        marginRight: '20px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '15px',
    },
    textareaSmall: {
        width: 'calc(100% - 20px)',
        padding: '8px',
        marginBottom: '8px',
        marginRight: '20px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '15px',
        minHeight: '60px',
    },
    select: {
        width: 'calc(100% - 20px)', 
        padding: '8px',
        marginBottom: '8px',
        marginRight: '20px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '15px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    submitButton: {
        width: '48%',
    },
    cancelButton: {
        width: '48%',
    },
};

export default RecipeForm;



