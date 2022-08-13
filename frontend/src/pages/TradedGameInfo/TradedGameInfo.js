import React, { useEffect, useState } from "react";
import "./TradedGameInfo.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { userToken } from "../../utils/Token";

const GameInfoPage = () => {
  const id = document.URL.split("/")[4];
  const [game, setGame] = useState([]);
  const [phone, setPhone] = useState([]);
  // const [platforms, setPlatforms] = useState([]);
  // const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/traddedgame/${id}`)
      .then((res) => {
        setGame(res.data.data);
        // setPlatforms(res.data.data.platforms);
        // setGenres(res.data.data.genres);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    // get user
    axios
      .get(`${BASE_URL}/user/${game.user_id}`)
      .then((res) => {
        setPhone(res.data.data.phone);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  const buy = (e) => {
    if (userToken) {
      window.open(
        "https://web.whatsapp.com/send?phone=961" +
          phone +
          "&text&app_absent=0",
        "_blank"
      );
    } else {
      window.location.href = "/access";
    }
  };
  return (
    <>
      <Navbar />
      <div className="game_info_container">
        <div className="main_Card">
          <h2 className="name">{game.name}</h2>
          <span className="publisher">{game.publisher}</span>
          <div className="platforms">
            <span className="platform">{game.platform}</span>
          </div>
          <button
            className="buy-btn"
            onClick={(e) => {
              buy(e);
            }}
          >
            <span>Contact on </span> <WhatsAppIcon />
          </button>
        </div>
        <div className="image_and_info_container">
          <div className="img_container">
            <img
              src={"http://localhost:8000/image/" + game.image}
              alt="game"
            ></img>
          </div>
          <div className="info_section">
            <div className="game-info">
              <h2>Game and Legal Info</h2>
              <div className="game-description">
                <p>{game.description}</p>
              </div>
            </div>
            <div className="basic-info">
              <div className="item">
                <span className="item-name">Platform: </span>
                <div style={{ width: "60%" }}>
                  <span className="item-info">{game.platform}</span>
                </div>
              </div>
              <div className="item">
                <span className="item-name">Publisher: </span>
                <span className="item-info">{game.publisher}</span>
              </div>
              <div className="item">
                <span className="item-name">Genre: </span>
                <span className="item-info">{game.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GameInfoPage;
