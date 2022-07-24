import React from "react";
import "./LatestGames.css";
import img from "../../assets/images/Ry0b7FGqNjHQvNRpRE9RjU3I.webp";
import GameContainer from "../GameContainer/GameContainer";

const LatestGames = () => {
  return (
    <>
      <div className="section_header">
        <h3>Latest Games</h3>
        <a href="browse">View All</a>
      </div>
      <div className="games_container">
        <GameContainer
          img={img}
          platform="ps5"
          name="Call of Duty®: Modern"
          price="1.06"
        />
        <GameContainer
          img={img}
          platform="ps5"
          name="Call of Duty®: Modern Warfare® II"
          price="1.06"
        />
        <GameContainer
          img={img}
          platform="ps5"
          name="Call of Duty®: Modern Warfare® II"
          price="1.06"
        />
        <GameContainer
          img={img}
          platform="ps5"
          name="Call of Duty®: Modern"
          price="1.06"
        />
        <GameContainer
          img={img}
          platform="ps5"
          name="Call of Duty®: Modern Warfare® II"
          price="1.06"
        />
      </div>
    </>
  );
};
export default LatestGames;
