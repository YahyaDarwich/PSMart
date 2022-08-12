import React, { useState, useEffect } from "react";
import TradeGameContainer from "../../components/TradeGameContainer/TradeGameContainer";
import "./TradingPage.css";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const TradingPage = () => {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    // get all games
    axios
      .get(`${BASE_URL}/traddedgame/approved`)
      .then((res) => {
        setGames(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);
  return (
    <>
      <Navbar />
      <div className="trade_section_header">
        <h3>All Games</h3>
        <span>{count}</span>
      </div>
      <div className="trade_page_container">
        {games.map((game, index) => {
          return (
            <TradeGameContainer
              img={"http://localhost:8000/image/" + game.image}
              name={game.name}
              tradeTo={game.trade_to}
              key={index}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default TradingPage;
