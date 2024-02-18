// Import necessary modules from react-router-dom and react-query libraries
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from "./pages";

// Import loader and action functions from respective page components
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsLetterAction } from "./pages/Newsletter";

// Create a new instance of QueryClient with default options
const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Set stale time for queries to 5 minutes
    },
  },
});

// Create the router configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <HomeLayout />, // Render HomeLayout for the root path
    errorElement: <Error />, // Render Error component for errors at root level
    children: [
      {
        index: true, // Specify index route
        element: <Landing />, // Render Landing component for the root path
        errorElement: <SinglePageError />, // Render SinglePageError for Landing page errors
        loader: landingLoader(queryCLient), // Loader function for fetching Landing page data
      },
      {
        path: "cocktail/:id", // Path for displaying individual cocktail pages
        errorElement: <SinglePageError />, // Render SinglePageError for individual cocktail page errors
        loader: singleCocktailLoader(queryCLient), // Loader function for fetching data for individual cocktail pages
        element: <Cocktail />, // Render Cocktail component for individual cocktail pages
      },
      {
        path: "newsletter", // Path for newsletter page
        element: <Newsletter />, // Render Newsletter component for the /newsletter path
        action: newsLetterAction, // Action function for newsletter page
        errorElement: <SinglePageError />, // Render SinglePageError for newsletter page errors
      },
      {
        path: "about", // Path for about page
        element: <About />, // Render About component for the /about path
      },
    ],
  },
]);

// App component to render the RouterProvider with the configured router
const App = () => {
  return (
    <QueryClientProvider client={queryCLient}>
      <RouterProvider router={router} /> {/* Render RouterProvider with configured router */}
      <ReactQueryDevtools initialIsOpen={false} /> {/* Render ReactQueryDevtools */}
    </QueryClientProvider>
  );
};

// Export the App component as default
export default App;
