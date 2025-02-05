import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import axiosInstance from "../api/axiosInstance"; 
import checkAuth from "../auth/checkAuth"; 
import "../card.css";


const MyProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" }); // User details state
  const [recipes, setRecipes] = useState([]); // User's recipes state
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [newName, setNewName] = useState(""); // State for the editable name
  const [error, setError] = useState(""); // Error state for API errors
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user profile and recipes on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("user/profile");
        if (response.data.success) {
          setUser(response.data.user);
          setRecipes(response.data.recipes);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("An error occurred while fetching profile data.");
      }
    };

    fetchProfileData();
  }, []);

  // Handle Save Name
  const handleSaveName = async () => {
    if (!newName.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.patch("user/updateName", { newName });
      if (response.data.success) {
        setUser(response.data.user); // Update the user state with the new name
        setNewName(""); // Clear the input field
        setEditMode(false); // Exit edit mode
        setError(""); // Clear any errors
      } else {
        setError(response.data.message || "Failed to update name.");
      }
    } catch (err) {
      console.error("Error updating name:", err);
      setError("An error occurred while updating your name.");
    }
  };

  // Handle Delete Recipe
  const handleDeleteRecipe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/recipe/delete/${id}`);
      if (response.data.success) {
        alert("Recipe deleted successfully.");
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id)); // Remove the deleted recipe from the state
      } else {
        alert(response.data.message || "Failed to delete recipe.");
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("An error occurred while deleting the recipe.");
    }
  };

  return (
    <div className="page-background">
  <Navbar />
  <div className="container-fluid mt-5"> {/* Use container-fluid for full width */}
    {/* My Profile Section */}
    <div className="profile-section mb-5">
      <h2 className="text-center mb-4">My Profile</h2>

      {/* User Details */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p>
            <strong>Name:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                className="form-control d-inline w-auto"
                value={newName}
                onChange={(e) => setNewName(e.target.value)} // Update new name state
                autoFocus
              />
            ) : (
              user.name
            )}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div>
          {editMode ? (
            <button
              className="btn btn-success mr-2 mt-2"
              onClick={handleSaveName}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2 mt-2"
              onClick={() => {
                setEditMode(true);
                setNewName(user.name); // Initialize newName with the current name
              }}
            >
              Change Name
            </button>
          )}
          <Link to="/changepassword" className="btn btn-warning mt-2">
            Change Password
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger">{error}</p>}
    </div>

    {/* My Recipes Heading */}
    <h3 className="text-center mb-4">My Recipes</h3>

    {/* Add Recipe Button */}
    <div className="text-center mb-4">
      <Link to="/addrecipe" className="btn btn-success">
        Add Recipe
      </Link>
    </div>

    {/* Recipe Cards */}
    <div className="row">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="col-md-4 mb-4">
          <div className="card myrecipe-card">
            <img
              src={recipe.image}
              className="card-img-top"
              alt={recipe.title}
              style={{
                width: "100%",
                height: "200px", // Fixed height
                objectFit: "cover", // Ensures the image is cropped to fit without distortion
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              <p className="card-text">Views: {recipe.viewCount}</p>
              {/* Stretched Link for Recipe Details */}
              <Link
                to={`/recipedetails/${recipe._id}`}
                className="stretched-link"
              ></Link>
            </div>
          </div>

          {/* Edit and Delete Buttons outside the card */}
          <div className="d-flex justify-content-between mt-2">
            {/* Edit Button as Link */}
            <Link
              to={`/editrecipe/${recipe._id}`}
              className="btn btn-secondary flex-grow-1 mr-2"
            >
              Edit
            </Link>
            {/* Delete Button with functionality */}
            <button
              className="btn btn-danger flex-grow-1"
              onClick={() => handleDeleteRecipe(recipe._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default checkAuth(MyProfile);
