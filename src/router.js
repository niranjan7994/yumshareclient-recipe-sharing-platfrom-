import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddRecipe from "./components/AddRecipe";
import ChangePassword from "./components/ChangePassword";
import EditRecipe from "./components/EditRecipe";
import MyProfile from "./components/MyProfile";
import RecipeDetails from "./components/RecipeDetails";
import Home from "./components/Home";


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "signup", element: <Signup /> },
  { path:"login",element:<Login/> },
  { path: "home", element: <Home /> },
  { path: "addrecipe", element: <AddRecipe /> },
  { path: "changepassword", element: <ChangePassword /> },
  { path: "editrecipe/:id", element: <EditRecipe /> },
  { path: "myprofile", element: <MyProfile /> },
  { path: "recipedetails/:id", element: <RecipeDetails /> }

]);

export default router;
