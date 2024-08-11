import RecipeList from './Recipelist';
import useFetch from '../middleware/useFetch';

const Home = () => {
    const { data: recipes, isPending, error } = useFetch('http://localhost:4000/Recipe');

    return (
        <section>
            {error && <p>{error}</p>}
            {isPending && <p>Loading recipes...</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </section>
    );
};

export default Home;


