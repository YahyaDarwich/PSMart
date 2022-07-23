import React from "react";
import "./GameInfoPage.css";
import img from "../../assets/images/E2vZwVaDJbhLZpJo7Q10IyYo.webp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const GameInfoPage = () => {
  return (
    <>
      <div className="game_info_container">
        <div className="main_Card">
          <h2 className="name">Bright Memory: Infinite</h2>
          <span className="publisher">EA Sports</span>
          <div className="platforms">
            <span className="platform">ps5</span>
          </div>
          <span className="price">$2.22</span>
          <button className="buy-btn">
            <span>Buy by</span> <WhatsAppIcon/>
          </button>
        </div>
        <div className="image_and_info_container">
          <div className="img_container">
            <img src={img} alt="game"></img>
          </div>
          <div className="info_section">
            <div className="game-info">
              <h2>Game and Legal Info</h2>
              <div className="game-description">
                <p>
                  Bright Memory: Infinite is an epic fusion of the FPS and
                  action genres brought to you by indie developer FYQD-Studio.
                  Combine a range of skills and abilities to unleash dazzling
                  combos on your enemies. Story: In the year 2036, a strange
                  phenomenon for which scientists can find no explanation has
                  occurred in the skies around the world. <br/><br/>
                  The Supernatural Science Research Organization (SRO) has sent agents out to
                  various regions to investigate this phenomenon. It is soon
                  discovered that these strange occurrences are connected to an
                  archaic mystery - an as-of-yet unknown history of two worlds,
                  about to come to light...
                </p>
              </div>
            </div>
            <div className="basic-info">
              <div className="item">
                <span className="item-name">Platform: </span>
                <span className="item-info">PS5</span>
              </div>
              <div className="item">
                <span className="item-name">Publisher: </span>
                <span className="item-info">Shooter</span>
              </div>
              <div className="item">
                <span className="item-name">Release: </span>
                <span className="item-info">21/205/2022</span>
              </div>
              <div className="item">
                <span className="item-name">Genre: </span>
                <span className="item-info">Shooter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameInfoPage;
