import React, { useEffect, useState } from "react";
import "./GameInfoPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { userToken } from "../../utils/Token";

const GameInfoPage = () => {
  const id = document.URL.split("/")[4];
  const [game, setGame] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  window.scrollTo(0, 0);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/game/${id}`)
      .then((res) => {
        setGame(res.data.data);
        setPlatforms(res.data.data.platforms);
        setGenres(res.data.data.genres);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  const buy = (e) => {
    if (userToken) {
      window.open(
        "https://web.whatsapp.com/send?phone=96176342113&text&app_absent=0",
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
            {platforms.map((platform, index) => {
              return (
                <span className="platform" key={index}>
                  {platform.name}
                </span>
              );
            })}
          </div>
          <span className="price">${game.price}</span>
          <button
            className="buy-btn"
            onClick={(e) => {
              buy(e);
            }}
          >
            <span>Buy on </span> <WhatsAppIcon />
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
                  {platforms.map((platform, index) => {
                    return (
                      <span className="item-info" key={index}>
                        {platform.name}{" "}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="item">
                <span className="item-name">Publisher: </span>
                <span className="item-info">{game.publisher}</span>
              </div>
              <div className="item">
                <span className="item-name">Release: </span>
                <span className="item-info">{game.release_date}</span>
              </div>
              <div className="item">
                <span className="item-name">Genre: </span>
                <div style={{ width: "60%" }}>
                  {genres.map((genre, index) => {
                    return (
                      <span className="item-info" key={index}>
                        {genre.name}{" "}
                      </span>
                    );
                  })}
                </div>
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
