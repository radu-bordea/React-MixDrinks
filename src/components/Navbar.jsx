// Import NavLink component from react-router-dom for navigation links
import { NavLink } from "react-router-dom";
// Import Wrapper component for styling
import Wrapper from "../assets/wrappers/Navbar";

// Navbar component to display navigation links
const Navbar = () => {
  return (
    // Wrapper component for styling
    <Wrapper>
      {/* Navbar center content */}
      <div className="nav-center">
        {/* Logo */}
        <span className="logo">MixDrinks</span>
        {/* Navigation links */}
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
