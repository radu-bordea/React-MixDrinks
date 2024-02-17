// Import the Wrapper component for styling
import Wrapper from "../assets/wrappers/CocktailCard";
// Import necessary components and hooks from react-router-dom
import { Link, useOutletContext } from "react-router-dom";

// CocktailCard component to display details of a cocktail
const CocktailCard = ({ image, name, id, info, glass }) => {
  // Uncomment the lines below if context is used
  // const data = useOutletContext();
  // console.log(data);

  return (
    // Wrapper component for styling
    <Wrapper>
      {/* Container for the cocktail image */}
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      {/* Footer section displaying cocktail details */}
      <div className="footer">
        {/* Cocktail name */}
        <h4>{name}</h4>
        {/* Type of glass */}
        <h5>{glass}</h5>
        {/* Alcoholic info */}
        <p>{info}</p>
        {/* Link to view details */}
        <Link to={`/cocktail/${id}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;
