// Import the Wrapper component for styling
import Wrapper from "../assets/wrappers/CocktailList";
// Import the CocktailCard component for displaying individual cocktail cards
import CocktailCard from "./CocktailCard";

// CocktailList component to display a list of cocktails
const CocktailList = ({ drinks }) => {
  // Render a message if no drinks are available
  if (!drinks) {
    return (
      <h4 style={{ textAlign: "center" }}>No matching cocktails found...</h4>
    );
  }

  // Format the drinks data into the required structure
  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  // Render the list of formatted drinks using CocktailCard components
  return (
    // Wrapper component for styling
    <Wrapper>
      {formattedDrinks.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

export default CocktailList;
