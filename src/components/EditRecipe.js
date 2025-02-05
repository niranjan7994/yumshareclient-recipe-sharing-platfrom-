import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../api/axiosInstance";
import checkAuth from "../auth/checkAuth";
import "../editrecipe.css";

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    difficulty: "Easy",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch recipe details on component mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get(`/recipe/details/${id}`);
        if (response.data.success) {
          setFormData({
            title: response.data.recipe.title,
            ingredients: response.data.recipe.ingredients,
            steps: response.data.recipe.steps,
            cookingTime: response.data.recipe.cookingTime,
            difficulty: response.data.recipe.difficulty,
            image: null,
            existingImage: response.data.recipe.image, // Store the existing image
          });
        } else {
          setError("Failed to fetch recipe details.");
        }
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("An error occurred while fetching the recipe.");
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change and preview the selected image
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData((prevState) => ({
      ...prevState,
      image: file,
      previewImage: URL.createObjectURL(file), // Create a preview URL for the new image
    }));
  }
};


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("ingredients", formData.ingredients);
    form.append("steps", formData.steps);
    form.append("cookingTime", formData.cookingTime);
    form.append("difficulty", formData.difficulty);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axiosInstance.put(`/recipe/edit/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccess("Recipe updated successfully.");
        setTimeout(() => navigate(`/recipedetails/${id}`), 2000); // Redirect after 2 seconds
      } else {
        setError(response.data.message || "Failed to update recipe.");
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
      setError("An error occurred while updating the recipe.");
    }
  };

  return (
    <div className="editrecipe-background">
      <Navbar />
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="editrecipe-form-container" onSubmit={handleSubmit}>

              {/* Form Title */}
              <h2 className="text-center mb-4">Edit Recipe</h2>
              
              {/* Error or Success Messages */}
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}

              {/* Recipe Title */}
              <div className="form-group">
                <label htmlFor="title">Recipe Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Ingredients */}
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  className="form-control"
                  id="ingredients"
                  name="ingredients"
                  rows="3"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Cooking Steps */}
              <div className="form-group">
                <label htmlFor="steps">Steps</label>
                <textarea
                  className="form-control"
                  id="steps"
                  name="steps"
                  rows="4"
                  value={formData.steps}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Cooking Time */}
              <div className="form-group">
                <label htmlFor="cookingTime">Cooking Time (in minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  id="cookingTime"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Difficulty Level */}
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  className="form-control"
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label htmlFor="image">Recipe Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                />
                {/* Show preview of the new image if selected, otherwise show the existing image */}
{formData.previewImage ? (
  <img
    src={formData.previewImage}
    alt="New Recipe Preview"
    className="mt-3"
    style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
  />
) : formData.existingImage ? (
  <img
    src={formData.existingImage}
    alt="Existing Recipe"
    className="mt-3"
    style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
  />
) : null}

              </div>

              {/* Update Recipe Button */}
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Update Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(EditRecipe);
