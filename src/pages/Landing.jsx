// Import necessary modules from react-router-dom and axios
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// Import CocktailList and SearchForm components
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

// URL for searching cocktails
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Import useQuery hook from react-query library
import { useQuery } from "@tanstack/react-query";

// Function to define the query for searching cocktails
const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"], // Unique key for the query
    queryFn: async () => {
      // Fetch data from the API based on the search term
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks; // Return drinks data from the response
    },
  };
};

// Loader function to fetch cocktail data
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    // Set an empty search term
    const searchTerm = url.searchParams.get("search") || "";

    // Ensure query data for searching cocktails with the given search term
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    // Return an object containing the list of drinks and the search term
    return { searchTerm };
  };

// Landing component to display the list of cocktails
const Landing = () => {
  // Get data using useLoaderData hook
  const { searchTerm } = useLoaderData();

  // Fetch data for searching cocktails based on the search term
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  // Render the Landing component
  return (
    <>
      {/* Render SearchForm component with the current search term */}
      <SearchForm searchTerm={searchTerm} />
      {/* Render CocktailList component with the list of drinks */}
      <CocktailList drinks={drinks} />
    </>
  );
};

// Export the Landing component as default
export default Landing;
