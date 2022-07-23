import React from "react";
import Footer from "../components/Footer/Footer";
import Landing from "../components/Landing/Landing";
import LatestGames from "../components/LatestGames/LatestGames";

const HomePage = () => {
  return (
    <>
      <Landing />
      <LatestGames />
      <Footer/>
    </>
  );
};
export default HomePage;
