import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../api/axiosInstance";
import checkAuth from "../auth/checkAuth";
import "../home.css";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const recipesPerPage = 3; // Number of recipes per page

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("recipe/recipelist");
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    fetchRecipes();
  }, []);

  // Filter recipes based on search input
  const filteredRecipes = searchInput
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : recipes;

  // Determine recipes to display for the current page
  const recipesToDisplay = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="page-background">
      <Navbar />
      <div className="container mt-5 ">
        {/* Search Box */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search Recipes"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
               <span className="input-group-text bg-white border-0 rounded-icon ml-2">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Search Results Header */}
        {searchInput && (
          <div className="row mb-4">
            <div className="col-12">
              <h4 className="text-yellow">
                Results for <span className="text-white">"{searchInput}"</span>
              </h4>
            </div>
          </div>
        )}

        {/* Recipe Cards */}
        <div className="row">
          {recipesToDisplay.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card home-card">
                <img
                  src={recipe.imageUrl}
                  className="card-img-top border rounded"
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{recipe.title}</h5>
                  <p className="card-text text-center">Creator: {recipe.creator}</p>
                  <Link
                    to={`/recipedetails/${recipe.id}`}
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    &laquo;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default checkAuth(Home);
