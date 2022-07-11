import React from "react";
import "./LatestGames.css";
import img from "../../assets/images/Ry0b7FGqNjHQvNRpRE9RjU3I.webp";
const LatestGames = () => {
  return (
    <>
      <div className="section_header">
        <h3>New Games</h3>
        <a href="#browse">View All</a>
      </div>
      <div className="games_container">
        <div className="one_game_container">
          <a href="#game">
            <div className="img_container">
              <img src={img} alt=""></img>
            </div>
            <div className="platforms">
              <span className="platform">PS4</span>
            </div>
            <h3 className="name">Call of Duty®: Modern Warfare® II </h3>
            <span className="price">$1.09</span>
          </a>
        </div>
        <div className="one_game_container">
          <a href="#game">
            <div className="img_container">
              <img src={img} alt=""></img>
            </div>
            <div className="platforms">
              <span className="platform">PS4</span>
              <span className="platform">PS5</span>
            </div>
            <h3 className="name">Call of Duty®: Modern Warfare® II</h3>
            <span className="price">$1.09</span>
          </a>
        </div>
        <div className="one_game_container">
          <a href="#game">
            <div className="img_container">
              <img src={img} alt=""></img>
            </div>
            <div className="platforms">
              <span className="platform">PS4</span>
            </div>
            <h3 className="name">Call of Duty®: II</h3>
            <span className="price">$1.09</span>
          </a>
        </div>
        <div className="one_game_container">
          <a href="#game">
            <div className="img_container">
              <img src={img} alt=""></img>
            </div>
            <div className="platforms">
              <span className="platform">PS4</span>
              <span className="platform">PS5</span>
            </div>
            <h3 className="name">Call of Duty®: Modern Warfare® II</h3>
            <span className="price">$1.09</span>
          </a>
        </div>
        <div className="one_game_container">
          <a href="#game">
            <div className="img_container">
              <img src={img} alt=""></img>
            </div>
            <div className="platforms">
              <span className="platform">PS4</span>
              <span className="platform">PS5</span>
            </div>
            <h3 className="name">Call of Duty®: II</h3>
            <span className="price">$1.09</span>
          </a>
        </div>
      </div>
    </>
  );
};
export default LatestGames;
