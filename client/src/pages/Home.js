import React from "react";
import SweaterList from "../components/ProductList";
import TagMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      {/* <TagMenu /> */}
      <SweaterList />
      <Cart />
    </div>
  );
};

export default Home;
