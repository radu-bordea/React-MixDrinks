import React from "react";
import { useRouteError } from "react-router-dom";

// Component to display an error message for a single page
const SinglePageError = () => {
  // Get the route error using useRouteError hook
  const error = useRouteError();
  console.log(error);
  
  // Render the error message
  return <h2>{error.message}</h2>;
};

export default SinglePageError;
