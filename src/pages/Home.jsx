import React from "react";

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import CategorySection from "../components/CategorySection.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Features from "../components/Features.jsx";

function Home() {
  const products = [
    {
      name: "Engineering Mathematics Book",
      price: "₹350",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=85",
      alt: "Engineering Mathematics Book",
    },
    {
      name: "HP Pavilion Laptop",
      price: "₹28,000",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85",
      alt: "HP Pavilion Laptop",
    },
    {
      name: "Study Chair",
      price: "₹1,200",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85",
      alt: "Study Chair",
    },
    {
      name: "Boat Headphones",
      price: "₹1,000",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85",
      alt: "Boat Headphones",
    },
    {
      name: "Skybags Backpack",
      price: "₹800",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=85",
      alt: "Skybags Backpack",
    },
    {
      name: "Yamaha Acoustic Guitar",
      price: "₹5,500",
      image:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=85",
      alt: "Yamaha Acoustic Guitar",
    },
  ];

  return (
    <>
      <Navbar />

      <Hero />

      <main className="container">
        <CategorySection />

        <div className="listing-heading">
          <h2>Featured Listings</h2>

          <a href="/browse" className="view-listings">
            View all listings
          </a>
        </div>

        <div className="products">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              image={product.image}
              alt={product.alt}
            />
          ))}
        </div>

        <Features />
      </main>
    </>
  );
}

export default Home;