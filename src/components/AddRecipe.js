import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../api/axiosInstance";
import Navbar from "./Navbar";
import checkAuth from "../auth/checkAuth";
import "../addrecipe.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview URL
  const [messages, setMessages] = useState([]); // Store an array of messages
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate and set the image preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([]);
    setSuccess(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("cookingTime", cookingTime);
    formData.append("difficulty", difficulty);
    formData.append("image", image);

    try {
      const response = await axios.post("/recipe/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMessages(["Recipe added successfully!"]);
        setSuccess(true);

        // Reset form fields
        setTitle("");
        setIngredients("");
        setSteps("");
        setCookingTime("");
        setDifficulty("Easy");
        setImage(null);
        setImagePreview(null);

        // Navigate to My Profile page after 2 seconds
        setTimeout(() => {
          navigate("/myprofile"); // Replace "/myprofile" with your actual profile route
        }, 2000); // 2 seconds delay
      } else {
        setMessages([response.data.message]);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      const errorMessages =
        error.response?.data?.errors || [error.response?.data?.message || "An error occurred. Please try again."];
      setMessages(errorMessages);
      setSuccess(false);
    }
  };

  return (
    <div className="addrecipe-background">
      <Navbar />
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              className="addrecipe-form-container"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Form Title */}
              <h2 className="text-center mb-4">Add Recipe</h2>

              {/* Form Fields */}
              <div className="form-group">
                <label htmlFor="title">Recipe Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter recipe title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  className="form-control"
                  id="ingredients"
                  rows="3"
                  placeholder="Enter ingredients separated by commas"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="steps">Steps</label>
                <textarea
                  className="form-control"
                  id="steps"
                  rows="4"
                  placeholder="Enter cooking steps separated by full stops"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="cookingTime">Cooking Time (in minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  id="cookingTime"
                  placeholder="Enter cooking time"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  min={1}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  className="form-control"
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Recipe Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={handleFileChange}
                  required
                />
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Recipe Preview"
                      className="img-fluid rounded"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>

              {/* Display Error or Success Messages */}
              {messages.length > 0 && (
                <div
                  className={`alert ${success ? "alert-success" : "alert-danger"}`}
                  role="alert"
                >
                  <ul className="mb-0">
                    {messages.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(AddRecipe);