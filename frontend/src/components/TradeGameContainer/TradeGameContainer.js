import React from "react";
import "./TradeGameContainer.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const TradeGameContainer = (props) => {
  return (
    <>
      <div className="trade_game_container">
        <a href="#trade">
          <div className="img_container">
            <img src={props.img} alt={props.name}></img>
          </div>
          <div className="trade_info">
            <span>{props.name}</span>
            <div className="arrow-icon">
              <KeyboardDoubleArrowDownIcon fontSize="medium" />
            </div>
            <span>{props.tradeTo}</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default TradeGameContainer;
