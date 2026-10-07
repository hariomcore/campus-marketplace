import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./PostItem.css";

const SUPABASE_URL = "https://kgblcekcxkkmigjsbwbo.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_vevfsasP9ZzzU8zCLh5qWQ_H4uLd_2W";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function PostItem() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
    }
  };

  checkUser();
  }, []);

  const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const newItem = {
    id: Date.now(),
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    condition: formData.get("condition"),
    description: formData.get("description"),
    location: formData.get("location"),
    image: image,
  };

  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  listings.push(newItem);

  localStorage.setItem(
    "listings",
    JSON.stringify(listings)
  );

  alert("Your item has been posted successfully!");

  event.target.reset();
  setImage(null);
  };

  return (
    <div className="post-item-page">

      {/* NAVBAR */}
      <header className="navbar">

        <a href="/" className="logo">
          <div className="logo-icon">🎓</div>

          <div className="logo-text">
            Campus<br />
            <span>Marketplace</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/browse">Browse</a>
          <a href="/categories">Categories</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About Us</a>
        </nav>

        <div className="nav-right">

          <button className="post-btn active">
            ＋ Post an Item
          </button>

          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            ♧
          </button>

          <a href="/login" className="login-btn">
            <div className="profile-icon">♙</div>
            <span>Login</span>
          </a>

        </div>

      </header>


      {/* NOTIFICATION */}
      {showNotifications && (
        <div className="notification-popup">
          <h3>Notifications</h3>

          <p>
            You currently have no new notifications.
          </p>
        </div>
      )}


      {/* PAGE HEADER */}
      <section className="page-header">

        <h1>Post an Item</h1>

        <p>
          Sell something you no longer need to students
          on your campus.
        </p>

      </section>


      {/* MAIN */}
      <main className="post-container">

        <form
          className="post-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT INFORMATION */}
          <div className="form-card">

            <div className="form-card-heading">
              <h2>Item Details</h2>

              <p>
                Tell students about the item you are selling.
              </p>
            </div>


            {/* ITEM NAME */}
            <div className="form-group">

              <label>
                Item Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Engineering Mathematics Book"
                required
              />

            </div>


            {/* CATEGORY + CONDITION */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  Category
                  <span>*</span>
                </label>

                <select
                  name="category"
                  required
                  defaultValue=""
                >

                  <option value="" disabled>
                    Select category
                  </option>

                  <option>Books & Notes</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Clothing</option>
                  <option>Sports</option>
                  <option>Hobbies</option>
                  <option>Stationery</option>
                  <option>Hostel Essentials</option>
                  <option>Others</option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Condition
                  <span>*</span>
                </label>

                <select
                  name="condition"
                  required
                  defaultValue=""
                >

                  <option value="" disabled>
                    Select condition
                  </option>

                  <option>Like New</option>
                  <option>Good Condition</option>
                  <option>Fair Condition</option>
                  <option>Used</option>
                </select>

              </div>

            </div>


            {/* PRICE + LOCATION */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  Price
                  <span>*</span>
                </label>

                <div className="price-input">
                  <span>₹</span>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    placeholder="Enter price"
                    required
                  />
                </div>

              </div>


              <div className="form-group">

                <label>
                  Campus / Location
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. GL Bajaj Campus"
                  required
                />

              </div>

            </div>


            {/* DESCRIPTION */}
            <div className="form-group">

              <label>
                Description
                <span>*</span>
              </label>

              <textarea
                name="description"
                rows="6"
                placeholder="Describe your item, its condition, features, etc."
                required
              ></textarea>

            </div>

          </div>


          {/* IMAGE */}
          <div className="form-card">

            <div className="form-card-heading">

              <h2>Product Image</h2>

              <p>
                Upload a clear photo of the item.
              </p>

            </div>


            <label className="image-upload">

              {image ? (
                <img
                  src={image}
                  alt="Product preview"
                  className="image-preview"
                />
              ) : (
                <>
                  <div className="upload-icon">
                    📷
                  </div>

                  <h3>
                    Upload Product Image
                  </h3>

                  <p>
                    Click here to choose an image
                  </p>

                  <span>
                    PNG, JPG or JPEG
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                hidden
              />

            </label>

          </div>


          {/* SAFETY */}
          <div className="safety-box">

            <div className="safety-icon">
              🛡️
            </div>

            <div>
              <h3>Sell Safely</h3>

              <p>
                Meet buyers in public campus locations,
                verify payments before handing over the item,
                and never share your password or sensitive
                account information.
              </p>
            </div>

          </div>


          {/* ACTIONS */}
          <div className="form-actions">

            <a
              href="/browse"
              className="cancel-btn"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="publish-btn"
            >
              Publish Listing
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default PostItem;