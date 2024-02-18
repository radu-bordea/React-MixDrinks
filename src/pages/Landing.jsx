import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

// URL for searching cocktails
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Loader function to fetch cocktail data
export const loader = async () => {
  // Set an empty search term
  const searchTerm = "";
  // Fetch data from the API based on the search term
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);

  // Return an object containing the list of drinks and the search term
  return { drinks: response.data.drinks, searchTerm };
};

// Landing component to display the list of cocktails
const Landing = () => {
  // Get data using useLoaderData hook
  const { drinks, searchTerm } = useLoaderData();

  return (
    <>
      <SearchForm />
      {/* Render CocktailList component with the list of drinks */}
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
