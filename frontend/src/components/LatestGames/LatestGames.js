import React, { useState, useEffect } from "react";
import "./LatestGames.css";
import GameContainer from "../GameContainer/GameContainer";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

const LatestGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // get latest games
    axios
      .get(`${BASE_URL}/game/latest`)
      .then((res) => {
        setGames(res.data.data);
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
        {games.map((game, index) => {
          return (
            <GameContainer
              img={"http://localhost:8000/image/" + game.image}
              platform={game.platforms}
              name={game.name}
              price={game.price}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
export default LatestGames;
