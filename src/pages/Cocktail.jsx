import {
  useLoaderData,
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";

// URL for fetching data of a single cocktail
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// Loader function to fetch data for a single cocktail
export const loader = async ({ params }) => {
  const { id } = params;
  // Fetch data from the API
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);

  return { id, data };
};

// Cocktail component to display details of a single cocktail
const Cocktail = () => {
  // Get the id and data of the cocktail using useLoaderData hook
  const { id, data } = useLoaderData();

  // Navigate to the home page if data is not available
  if (!data) return <Navigate to="/" />;

  // Extract relevant information of the cocktail
  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // Filter out valid ingredients (non-null) from the data
  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  // Log valid ingredients and single drink data
  console.log(validIngredients);
  console.log(singleDrink);

  return (
    <Wrapper>
      {/* Header section */}
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      {/* Main content */}
      <div className="drink">
        {/* Cocktail image */}
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          {/* Cocktail details */}
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={index}>
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
