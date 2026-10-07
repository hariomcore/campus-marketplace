import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Product.css";

const productDatabase = {
  "Engineering Mathematics Book": {
    category: "Books & Notes",
    price: "₹350",
    condition: "Like New",
    image:
      "https://cbspd.s3.ap-south-1.amazonaws.com/assets/images/m37TTvJYYCNsdf2V6X951732859387.jpg",
    description:
      "Engineering Mathematics book in good condition. Useful for engineering students for mathematics courses, assignments and examinations.",
    seller: "Hariom Thakur",
    sellerMeta: "Student · CSIT · 2nd Year",
    avatar: "AK",
  },

  "HP Pavilion Laptop": {
    category: "Electronics",
    price: "₹28,000",
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    description:
      "HP Pavilion laptop in excellent condition. Suitable for programming, college projects, assignments and everyday student use.",
    seller: "Harsh Pandey",
    sellerMeta: "Student · CSIT · 2nd Year",
    avatar: "AK",
  },

  "Study Chair": {
    category: "Furniture",
    price: "₹1,200",
    condition: "Good Condition",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1000&q=85",
    description:
      "Comfortable study chair in good condition. Perfect for studying, coding or working from a hostel room.",
    seller: "Daksh Srivastava",
    sellerMeta: "Student · CSIT · 2nd Year",
    avatar: "AK",
  },

  "Boat Headphones": {
    category: "Electronics",
    price: "₹1,000",
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    description:
      "Boat headphones in excellent condition. Suitable for music, online classes and entertainment.",
    seller: "Hariom Kumar",
    sellerMeta: "Student · CSE · 2nd Year",
    avatar: "AK",
  },

  "Skybags Backpack": {
    category: "Accessories",
    price: "₹800",
    condition: "Good Condition",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    description:
      "Skybags backpack in good condition. Spacious and suitable for college books, laptop and everyday essentials.",
    seller: "Rohit Thakur",
    sellerMeta: "Student · CSE · 4th Year",
    avatar: "AK",
  },

  "Yamaha Acoustic Guitar": {
    category: "Hobbies",
    price: "₹5,500",
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=85",
    description:
      "Yamaha acoustic guitar in good condition. Suitable for beginners and students interested in learning guitar.",
    seller: "Pulkit Jha",
    sellerMeta: "Student · CSE · 1st Year",
    avatar: "AK",
  },
};

function Product() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedProduct =
  searchParams.get("name") || "Study Chair";

  const postedListings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  const product = productDatabase[selectedProduct] || 
    postedListings.find(
      (item) => item.name === selectedProduct
    );
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(product?.image || "");

  useEffect(() => {
    if (!product) return;

    setCurrentImage(product.image);

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const alreadySaved = wishlist.some(
      (item) => item.name === selectedProduct
    );

    setIsFavorite(alreadySaved);
  }, [selectedProduct, product]);

  const toggleFavorite = () => {
    if (!product) return;

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    if (isFavorite) {
      const updatedWishlist = wishlist.filter(
        (item) => item.name !== selectedProduct
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      setIsFavorite(false);
    } else {
      const wishlistItem = {
        name: selectedProduct,
        price: product.price,
        image: product.image,
        alt: selectedProduct,
      };

      wishlist.push(wishlistItem);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );

      setIsFavorite(true);
    }
  };

  const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const alreadyInCart = cart.some(
    (item) => item.name === product.name
  );

  if (alreadyInCart) {
    alert("This item is already in your cart.");
    return;
  }

  const cartItem = {
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    condition: product.condition,
  };

  cart.push(cartItem);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Item added to cart!");
};

  const goToBrowse = () => {
    navigate("/browse");
  };

  const startChat = () => {
    setShowContactModal(false);

    alert(
      "Chat feature will be available when the backend is connected."
    );
  };

  const sendRequest = () => {
    setShowRequestModal(false);

    localStorage.setItem(
      "purchaseRequest",
      selectedProduct
    );

    alert(
      "Your purchase request has been sent to the seller."
    );
  };

  const shareProduct = async () => {
    const productUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedProduct} | Campus Marketplace`,
          text: `Check out this ${selectedProduct} on Campus Marketplace.`,
          url: productUrl,
        });
      } catch (error) {
        // User cancelled sharing.
      }
    } else {
      try {
        await navigator.clipboard.writeText(productUrl);
        alert("Product link copied to clipboard.");
      } catch (error) {
        alert("Unable to copy the product link.");
      }
    }
  };

  if (!product) {
    return (
      <div className="product-page">
        <main className="page">
          <div className="back-row">
            <button
              className="back-btn"
              onClick={goToBrowse}
            >
              ← Back to Browse
            </button>
          </div>

          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>
              The product you are looking for does not exist.
            </p>

            <button
              className="request-btn"
              onClick={goToBrowse}
            >
              Browse Listings
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="product-page">

      <main className="page">

        {/* BACK */}

        <div className="back-row">
          <button
            className="back-btn"
            onClick={goToBrowse}
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5"></path>
              <path d="m12 19-7-7 7-7"></path>
            </svg>

            Back to Browse
          </button>
        </div>

        {/* PRODUCT */}

        <div className="product-container">

          {/* LEFT GALLERY */}

          <section className="gallery">

            <div className="main-image">

              <img
                src={currentImage}
                alt={selectedProduct}
              />

              {/* FAVORITE */}

              <button
                className={`favorite-btn ${
                  isFavorite ? "active" : ""
                }`}
                onClick={toggleFavorite}
                aria-label="Add to favorites"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"></path>
                </svg>
              </button>

              <div className="image-counter">
                1 / 1
              </div>

            </div>

            {/* THUMBNAILS */}

            <div className="thumbnails">

              <button
                className="thumbnail active"
                onClick={() =>
                  setCurrentImage(product.image)
                }
              >
                <img
                  src={product.image}
                  alt={selectedProduct}
                />
              </button>

            </div>

          </section>

          {/* RIGHT INFORMATION */}

          <section className="product-info">

            <div className="category-label">
              {product.category}
            </div>

            <h1 className="product-title">
              {selectedProduct}
            </h1>

            <div className="rating-row">

              <span className="condition">
                {product.condition}
              </span>

            </div>

            <div className="price">
              {product.price}

              <span className="price-note">
                negotiable
              </span>
            </div>

            <div className="divider"></div>

            {/* DESCRIPTION */}

            <h2 className="info-heading">
              Description
            </h2>

            <p className="description">
              {product.description}
            </p>

            {/* PRODUCT DETAILS */}

            <div className="divider"></div>

            <h2 className="info-heading">
              Product Details
            </h2>

            <div className="details-grid">

              <div className="detail">
                <div className="detail-label">
                  Category
                </div>

                <div className="detail-value">
                  {product.category}
                </div>
              </div>

              <div className="detail">
                <div className="detail-label">
                  Condition
                </div>

                <div className="detail-value">
                  {product.condition}
                </div>
              </div>

              <div className="detail">
                <div className="detail-label">
                  Listed
                </div>

                <div className="detail-value">
                  2 days ago
                </div>
              </div>

            </div>

            {/* SELLER */}

            <div className="seller-card">

              <div className="seller-left">

                <div className="seller-avatar">
                  {product.avatar}
                </div>

                <div>

                  <div className="seller-name">
                    {product.seller}
                  </div>

                  <div className="seller-meta">
                    {product.sellerMeta}
                  </div>

                </div>

              </div>

              <div className="verified">

                <svg viewBox="0 0 24 24">
                  <path d="M12 3l2.2 1.2 2.5-.1 1.1 2.3 2 1.5-.7 2.4.7 2.4-2 1.5-1.1 2.3-2.5-.1L12 21l-2.2-1.2-2.5.1-1.1-2.3-2-1.5.7-2.4-.7-2.4 2-1.5 1.1-2.3 2.5.1L12 3Z"></path>

                  <path d="m8.5 12 2.2 2.2 4.8-5"></path>
                </svg>

                Verified
              </div>

            </div>

            {/* ACTIONS */}

            <div className="actions">

              <button
                className="contact-btn"
                onClick={() => {
                setShowContactModal(true)
                  }}
                >
                Contact Seller
              </button>

                <button
                  className="cart-btn"
                  onClick={addToCart}
                >
                    🛒 Add to Cart
              </button>

              <button
                className="request-btn"
                onClick={() => {
                setShowRequestModal(true)
                  }}
                >
                Request to Buy
              </button>

            </div>
            
            {/* SHARE */}

            <div className="share-row">

              <button
                className="share-btn"
                onClick={shareProduct}
              >
                <svg viewBox="0 0 24 24">

                  <circle
                    cx="18"
                    cy="5"
                    r="2.5"
                  ></circle>

                  <circle
                    cx="6"
                    cy="12"
                    r="2.5"
                  ></circle>

                  <circle
                    cx="18"
                    cy="19"
                    r="2.5"
                  ></circle>

                  <path d="m8.2 10.8 7.6-4.5"></path>

                  <path d="m8.2 13.2 7.6 4.5"></path>

                </svg>

                Share this listing
              </button>

            </div>

            {/* SAFETY */}

            <div className="safety-box">

              <svg viewBox="0 0 24 24">

                <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"></path>

                <path d="m8.5 12 2.2 2.2 4.8-5"></path>

              </svg>

              <div>

                <h4>
                  Stay Safe
                </h4>

                <p>
                  Meet in a public campus location and
                  verify the item before making payment.
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

      {/* CONTACT MODAL */}

      {showContactModal && (
        <>
          <div
            className="overlay"
            onClick={() =>
              setShowContactModal(false)
            }
          ></div>

          <div className="modal">

            <h2>
              Contact Seller
            </h2>

            <p>
              You are contacting{" "}
              <strong>{product.seller}</strong>{" "}
              about the {selectedProduct}.
            </p>

            <div className="modal-actions">

              <button
                className="modal-btn modal-cancel"
                onClick={() =>
                  setShowContactModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="modal-btn modal-confirm"
                onClick={startChat}
              >
                Start Chat
              </button>

            </div>

          </div>
        </>
      )}

      {/* REQUEST MODAL */}

      {showRequestModal && (
        <>
          <div
            className="overlay"
            onClick={() =>
              setShowRequestModal(false)
            }
          ></div>

          <div className="modal">

            <h2>
              Request to Buy
            </h2>

            <p>
              Send a purchase request to the seller.
              The seller will be able to respond to
              your request.
            </p>

            <div className="modal-actions">

              <button
                className="modal-btn modal-cancel"
                onClick={() =>
                  setShowRequestModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="modal-btn modal-confirm"
                onClick={sendRequest}
              >
                Send Request
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default Product;