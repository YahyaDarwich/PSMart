import React, { useState, useEffect } from "react";
import "./BrowsePage.css";
import BrowseGameContainer from "../../components/BrowseGameContainer/BrowseGameContainer";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

const BrowsePage = () => {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    // get all games
    axios
      .get(`${BASE_URL}/game`)
      .then((res) => {
        setGames(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);
  return (
    <>
      <Navbar />
      <div className="browse_section_header">
        <h3>All Games</h3>
        <span>{count}</span>
      </div>
      <div className="browse_container">
        {games.map((game, index) => {
          return (
            <BrowseGameContainer
              img={"http://localhost:8000/image/" + game.image}
              name={game.name}
              key={index}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default BrowsePage;
