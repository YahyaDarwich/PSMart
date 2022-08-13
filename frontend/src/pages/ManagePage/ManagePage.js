import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ManagePage.css";
import TradedGamePost from "../../components/TradedGamePost/TradedGamePost";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { userID, userHeaders } from "../../utils/Token";

const ManagePage = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/traddedgame/user/${userID}`, userHeaders)
      .then((res) => {
        setGames(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);
  return (
    <>
      <Navbar />
      <div className="manage_games_container">
        <h2 className="header_title">Manage your taded games here!</h2>
        <div className="posts_grid">
          {games.map((game, index) => {
            return (
              <TradedGamePost
                key={index}
                image={game.image}
                name={game.name}
                description={game.description}
                id={game.id}
                status={game.status}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManagePage;
