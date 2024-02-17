import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // Render HomeLayout for the root path
    errorElement: <Error />, // Render Error component for errors at root level
    children: [
      {
        index: true,
        element: <Landing />, // Render Landing component for the root path
        errorElement: <SinglePageError />, // Render SinglePageError for Landing page errors
        loader: landingLoader, // Loader function for fetching Landing page data
      },
      {
        path: "cocktail/:id", // Path for displaying individual cocktail pages
        errorElement: <SinglePageError/>, // Render SinglePageError for individual cocktail page errors
        loader: singleCocktailLoader, // Loader function for fetching data for individual cocktail pages
        element: <Cocktail />, // Render Cocktail component for individual cocktail pages
      },
      {
        path: "newsletter",
        element: <Newsletter />, // Render Newsletter component for the /newsletter path
      },
      {
        path: "about",
        element: <About />, // Render About component for the /about path
      },
    ],
  },
]);

// App component to render the RouterProvider with the configured router
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
