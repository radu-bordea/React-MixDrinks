import Wrapper from "../assets/wrappers/ErrorPage";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";

// Error component to display different error messages based on the route error
const Error = () => {
  // Get route error status using useRouteError hook
  const error = useRouteError();
  console.log(error);

  // Render specific error message for 404 status
  if (error.status === 404) {
    return (
      // Wrapper for styling
      <Wrapper>
        <div>
          {/* Image for not found */}
          <img src={img} alt="not found" />
          {/* Heading */}
          <h3>Ohh!</h3>
          {/* Error message */}
          <p>We can't seem to find the page you are looking for</p>
          {/* Link to navigate back to home */}
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }

  // Render generic error message for other errors
  return (
    // Wrapper for styling
    <Wrapper>
      <div>
        {/* Error message */}
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
