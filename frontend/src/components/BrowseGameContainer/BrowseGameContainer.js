import React from "react";
import "./BrowseGameContainer.css";

const BrowseGameContainer = (props) => {
  return (
    <>
      <div className="browse_game_container">
        <a href="#browse">
          <div className="img_container">
            <img src={props.img} alt={props.name}></img>
          </div>
          <div className="name">
            <span>{props.name}</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default BrowseGameContainer;
