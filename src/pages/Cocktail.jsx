// Import necessary modules from react-router-dom, axios, and custom components
import { useLoaderData, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';

// Define the URL for fetching a single cocktail from the API
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

// Import useQuery hook from react-query library
import { useQuery } from '@tanstack/react-query';

// Define a function that represents the query for fetching a single cocktail
const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id], // Unique key for the query
    queryFn: async () => { // Function to execute the query
      const { data } = await axios.get(`${singleCocktailUrl}${id}`); // Fetch data from API
      return data; // Return fetched data
    },
  };
};

// Export a loader function for loading data before rendering the component
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params; // Extract the id parameter from params
    await queryClient.ensureQueryData(singleCocktailQuery(id)); // Ensure data for the single cocktail query
    return { id }; // Return the id
  };

// Define the Cocktail component
const Cocktail = () => {
  const { id } = useLoaderData(); // Get the id from loader data
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const { data } = useQuery(singleCocktailQuery(id)); // Fetch data for the single cocktail

  // If no data is available, navigate back to the home page
  if (!data) return <Navigate to='/' />;

  // Extract details of the single drink from fetched data
  const singleDrink = data.drinks[0];

  // Destructure properties of the single drink
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // Filter out valid ingredients from the single drink data
  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  // Render the Cocktail component
  return (
    <Wrapper>
      <header>
        <button onClick={() => navigate(-1)} className='btn'>
          back home
        </button>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

// Export the Cocktail component as default
export default Cocktail;
