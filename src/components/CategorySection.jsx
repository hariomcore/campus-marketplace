import React from "react";
import { useNavigate } from "react-router-dom";

function CategorySection() {
  const navigate = useNavigate();
  const openCategory = (category) => {
    navigate("/browse?category=" + encodeURIComponent(category));
  };

  const openAllCategories = () => {
    window.location.href = "/categories.html";
  };

  return (
    <>
      <h2 className="category-title">Shop by Category</h2>

      <div className="categories">
        <div
          className="category books"
          onClick={() => openCategory("Books & Notes")}
        >
          <div className="category-icon">📚</div>
          <div>Books & Notes</div>
        </div>

        <div
          className="category electronics"
          onClick={() => openCategory("Electronics")}
        >
          <div className="category-icon">💻</div>
          <div>Electronics</div>
        </div>

        <div
          className="category furniture"
          onClick={() => openCategory("Furniture")}
        >
          <div className="category-icon">🪑</div>
          <div>Furniture</div>
        </div>

        <div
          className="category clothing"
          onClick={() => openCategory("Clothing")}
        >
          <div className="category-icon">👕</div>
          <div>Clothing</div>
        </div>

        <div
          className="category sports"
          onClick={() => openCategory("Sports")}
        >
          <div className="category-icon">🏀</div>
          <div>Sports</div>
        </div>

        <div
          className="category hobbies"
          onClick={() => openCategory("Hobbies")}
        >
          <div className="category-icon">🎸</div>
          <div>Hobbies</div>
        </div>

        <a href="/categories" className="view-categories">
          View all categories →
        </a>
      </div>
    </>
  );
}

export default CategorySection;