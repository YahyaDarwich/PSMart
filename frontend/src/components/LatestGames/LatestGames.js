import React, { useState, useEffect } from "react";
import "./LatestGames.css";
import GameContainer from "../GameContainer/GameContainer";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { Link } from "react-router-dom";
import FlipLoader from "../FlipLoader/FlipLoader";

const LatestGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get latest games
    axios
      .get(`${BASE_URL}/game/latest`)
      .then((res) => {
        setGames(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);
  return (
    <>
      <div className="section_header">
        <h3>Latest Games</h3>
        <a href="browse">View All</a>
      </div>
      <div className="games_container">
        {loading ? (
          <FlipLoader />
        ) : (
          games.map((game, index) => {
            return (
              <Link
                to={{
                  pathname: `/game/${game.id}`,
                }}
              >
                <GameContainer
                  img={"http://localhost:8000/image/" + game.image}
                  platform={game.platforms}
                  name={game.name}
                  price={game.price}
                  key={index}
                />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};
export default LatestGames;
