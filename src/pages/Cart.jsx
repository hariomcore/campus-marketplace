import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (name) => {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getPrice = (price) => {
    return Number(price.replace(/[₹,]/g, ""));
  };

  const total = cart.reduce((sum, item) => {
    return sum + getPrice(item.price);
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <h1>My Cart</h1>

        <p>
          Review the items you have added to your cart.
        </p>
      </div>

      <main className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              You haven't added any products to your cart yet.
            </p>

            <button
              className="browse-btn"
              onClick={() => navigate("/browse")}
            >
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-title-row">
                <h2>Cart Items</h2>

                <button
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div className="cart-item" key={item.name}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p className="cart-item-category">
                      {item.category}
                    </p>

                    <p className="cart-item-condition">
                      {item.condition}
                    </p>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">
                        {item.price}
                      </span>

                      <button
                        className="remove-cart-btn"
                        onClick={() =>
                          removeFromCart(item.name)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    "Checkout will be available when the payment system is connected."
                  )
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;