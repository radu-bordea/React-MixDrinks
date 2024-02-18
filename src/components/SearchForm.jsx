// Import the Wrapper component from the specified path
import Wrapper from "../assets/wrappers/SearchForm";
// Import necessary modules from react-router-dom
import { Form, useNavigation } from "react-router-dom";

// Define the SearchForm component
const SearchForm = ({ searchTerm }) => {
  // Get the navigation object using useNavigation hook
  const navigation = useNavigation();
  // Determine if the form is currently submitting
  const isSubmitting = navigation.state === "submitting";

  // Render the SearchForm component
  return (
    <Wrapper> {/* Use Wrapper component */}
      <Form className="form"> {/* Render a form with specified class */}
        {/* Input field for search */}
        <input
          type="search"
          name="search"
          className="form-input" // Apply class to input field
          defaultValue={searchTerm} // Set default value for input field
        />
        {/* Submit button */}
        <button type="submit" className="btn" disabled={isSubmitting}>
          {/* Button text changes based on submitting state */}
          {isSubmitting ? "searching" : "search"}
        </button>
      </Form>
    </Wrapper>
  );
};

// Export the SearchForm component as default
export default SearchForm;
