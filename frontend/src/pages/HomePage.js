import React from "react";
import Landing from "../components/Landing/Landing";
import LatestGames from "../components/LatestGames/LatestGames";
import TraddedSection from "../components/TraddedSection/TraddedSection";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <LatestGames />
      <TraddedSection />
      <Footer />
    </>
  );
};
export default HomePage;
