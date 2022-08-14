import React, { useState, useEffect } from "react";
import TradeGameContainer from "../../components/TradeGameContainer/TradeGameContainer";
import "./TradingPage.css";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import FlipLoader from "../../components/FlipLoader/FlipLoader";

const TradingPage = () => {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get all games
    axios
      .get(`${BASE_URL}/traddedgame/approved`)
      .then((res) => {
        setGames(res.data.data);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);
  return (
    <>
      <Navbar />
      <div className="trade_section_header">
        <h3>All Games</h3>
        <span>{count} items</span>
      </div>
      <div className="trade_page_container">
        {loading ? (
          <FlipLoader />
        ) : (
          games.map((game, index) => {
            return (
              <Link
                to={{
                  pathname: `/traddedgame/${game.id}`,
                }}
              >
                <TradeGameContainer
                  img={"http://localhost:8000/image/" + game.image}
                  name={game.name}
                  tradeTo={game.trade_to}
                  key={index}
                />
              </Link>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
};

export default TradingPage;
