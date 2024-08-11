import React, { useState, useEffect } from 'react';

// API functions
const fetchRecipes = async () => {
  const response = await fetch('http://localhost:4000/Recipe');
  if (!response.ok) throw new Error('Failed to fetch Recipe');
  return response.json();
};
var gg =  
{
    "id": 150,
    "recipeName": "tsetpoat",
    "ingredients": "tsetpoat, Tomato Sauce",
    "instructions": "Boil pasta, add sauce",
    "category": "tsetpoat Course",
    "preparation": "10 minutes",
    "cookingTime": "15 minutes",
    "Sservings": "2"
};
const createRecipe = async (recipe) => {
  const response = await fetch('http://localhost:4000/Recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gg),
  });
  if (!response.ok) throw new Error('Failed to create recipe');
  return response.json();
};

const updateRecipe = async (id, recipe) => {
  const response = await fetch(`http://localhost:4000/Recipe/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) throw new Error('Failed to update Recipe');
  return response.json();
};

const deleteRecipe = async (id) => {
  const response = await fetch(`http://localhost:4000/Recipe/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete Recipe');
};

const RecipeManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    recipeName: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparation: '',
    cookingTime: '',
    Sservings: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecipe(editingId, formData);
      } else {
        await createRecipe(formData);
      }
      setFormData({
        recipeName: '',
        ingredients: '',
        instructions: '',
        category: '',
        preparation: '',
        cookingTime: '',
        Sservings: '',
      });
      setEditingId(null);
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{editingId ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="recipeName"
          value={formData.recipeName}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
        />
        <input
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          required
        />
        <input
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          name="preparation"
          value={formData.preparation}
          onChange={handleChange}
          placeholder="Preparation Time"
          required
        />
        <input
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          placeholder="Cooking Time"
          required
        />
        <input
          name="Sservings"
          value={formData.Sservings}
          onChange={handleChange}
          placeholder="Servings"
          required
        />
        <button type="submit">{editingId ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>

      <h2>Recipe List</h2>
      <table>
        <thead>
          <tr>
            <th>Recipe Namekhjhi</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Category</th>
            <th>Preparation Time</th>
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
              <td>{recipe.cookingTime}</td>
              <td>{recipe.Sservings}</td>
              <td>
                <button onClick={() => handleEdit(recipe)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeManager;
