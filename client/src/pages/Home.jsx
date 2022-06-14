import React from "react";
import NavBar from "../component/NavBar";
import Slider from "../component/Slider";
import Categories from "../component/Categories";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Slider />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
