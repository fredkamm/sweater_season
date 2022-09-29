import React from "react";
import SweaterList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <SweaterList />
      <Cart />
    </div>
  );
};

export default Home;
