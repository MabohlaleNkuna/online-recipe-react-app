import { useParams } from 'react-router-dom';
import useFetch from '../middleware/useFetch';

const RecipeDetails = () => {
    const { id } = useParams();
    const { data: recipe, error, isPending } = useFetch("http://localhost:4000/Recipe" + id);

    return (
        <>
            <section>
                {isPending && <p>Loading recipe details...</p>}

                {error && <p>{error}</p>}

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
            </section>
        </>
    );
};

export default RecipeDetails;

