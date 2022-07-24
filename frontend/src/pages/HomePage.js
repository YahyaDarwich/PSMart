import React from "react";
import Landing from "../components/Landing/Landing";
import LatestGames from "../components/LatestGames/LatestGames";
import TraddedSection from "../components/TraddedSection/TraddedSection";

const HomePage = () => {
  return (
    <>
      <Landing />
      <LatestGames />
      <TraddedSection />
    </>
  );
};
export default HomePage;
