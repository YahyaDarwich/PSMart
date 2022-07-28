import React from "react";
import "./TraddedSection.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExploreIcon from "@mui/icons-material/Explore";

const TraddedSection = () => {
  return (
    <>
      <div className="trade_homepage_container">
        <div className="inner_container">
          <div className="container-heading">
            <h3 className="title">How to Trade your PS CD's</h3>
          </div>
          <div className="row-flex">
            <div className="one-row">
              <div className="one-row-icon">
                <HowToRegIcon className="icon" fontSize="large" />
              </div>
              <h4>Sign up</h4>
              <p>
                Sign up with your email address and your name. Don't forgot your
                password. Add on it, you’re good to go.
              </p>
            </div>
            <div className="one-row">
              <div className="one-row-icon">
                <PostAddIcon className="icon" fontSize="large" />
              </div>
              <h4>Add your Trade</h4>
              <p>
                After signing up, you can quickly add your trade games. Fill all
                the informations about your post and wait for accepting.
              </p>
            </div>
            <div className="one-row">
              <div className="one-row-icon">
                <ExploreIcon className="icon" fontSize="large" />
              </div>
              <h4>Explore more</h4>
              <p>
                You can explore the others tradded games. Also click browse link
                to buy new one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraddedSection;
