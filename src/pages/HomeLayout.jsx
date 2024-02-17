import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

// Layout component for the home page
const HomeLayout = () => {
  // Get navigation state using useNavigation hook
  const navigation = useNavigation();
  // Check if the page is currently loading
  const isPageLoading = navigation.state === "loading";
  // Example value for context
  const value = "some value";

  return (
    <>
      {/* Navbar component */}
      <Navbar />
      {/* Main section of the page */}
      <section className="page">
        {/* Display loading indicator if page is loading */}
        {isPageLoading ? (
          <div className="loading" />
        ) : (
          // Render the Outlet with context if page is not loading
          <Outlet context={{ value }} />
        )}
      </section>
    </>
  );
};

export default HomeLayout;
