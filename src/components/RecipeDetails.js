import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../api/axiosInstance"; // Axios instance for API calls
import checkAuth from "../auth/checkAuth";
import "../recipedetails.css";

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL parameters
  const [recipe, setRecipe] = useState(null); // State to store recipe details
  const [error, setError] = useState(""); // Error state

  // Fetch recipe details from the API
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/recipe/details/${id}`);
        if (response.data.success) {
          setRecipe(response.data.recipe);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details.");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detailspage-background">
      <Navbar />
      <div className="container mt-5 mb-5">
        {/* Recipe Container with Outline and Shadow */}
        <div className="recipedetails-card p-4 shadow-sm border rounded">
          {/* Recipe Title */}
          <h2 className="text-center mb-4">{recipe?.title}</h2>

          {/* Recipe Image */}
          <div className="text-center mb-4">
            <img
              src={recipe?.image}
              alt={recipe?.title}
              className="img-fluid rounded"
              style={{ maxWidth: "70%", maxHeight: "400px", objectFit:"cover" }}
            />
          </div>

          {/* Ingredients */}
<h4 className="mb-3">Ingredients:</h4>
<ul>
  {recipe?.ingredients.split(',').map((ingredient, index) => (
    <li key={index}>{ingredient.trim()}</li>
  ))}
</ul>


          {/* Steps */}
<h4 className="mb-3">Step-by-Step Cooking Instructions:</h4>
<ol>
  {recipe?.steps
    .split('.')
    .filter((step) => step.trim() !== '') // Remove empty steps
    .map((step, index) => (
      <li key={index}>{step.trim()}</li>
    ))}
</ol>

          {/* Cooking Time */}
          <h4 className="mb-3">Cooking Time:</h4>
          <p>{recipe?.cookingTime} minutes</p>

          {/* Difficulty Level */}
          <h4 className="mb-3">Difficulty Level:</h4>
          <p>{recipe?.difficulty}</p>

          {/* Creator's Name */}
          <h4 className="mb-3">Creator:</h4>
          <p>{recipe?.creator?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(RecipeDetails);
