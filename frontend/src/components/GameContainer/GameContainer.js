import React, { useState } from "react";
import "./GameContainer.css";

const GameContainer = (props) => {
  return (
    <>
      <div className="one_game_container">
        <a href="#game">
          <div className="img_container">
            <img src={props.img} alt={props.name}></img>
          </div>
          <div className="platforms">
            <span className="platform">{props.platform}</span>
          </div>
          <h3 className="name">{props.name}</h3>
          <span className="price">${props.price}</span>
        </a>
      </div>
    </>
  );
};

export default GameContainer;
