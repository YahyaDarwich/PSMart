import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="landing--container">
        <div className="overlay"></div>
        <div className="landing--text">
          <h2>Trade Your Games</h2>
          <p>
            Lebanon's First Cryptocurrency Fantasy Trading Gaming Platform Which
            Gives You Real Trading Experience
          </p>
          <Link to="/browse">
            <button>Browse</button>
          </Link>
        </div>
      </div>
      <div className="test"></div>
    </>
  );
};
export default Landing;
