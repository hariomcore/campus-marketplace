import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Categories from "./pages/Categories";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import PostItem from "./pages/PostItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Notifications from "./component/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="/post-item" element={<PostItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product" element={<Product />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;