import React from "react";
import TradeGameContainer from "../../components/TradeGameContainer/TradeGameContainer";
import "./TradingPage.css";
import img from "../../assets/images/MkbqF5veMFZnmQRtsbmQoNZT.webp";
import img1 from "../../assets/images/E2vZwVaDJbhLZpJo7Q10IyYo.webp";
import img2 from "../../assets/images/sSOaeqXF28TQQlUGhEQ7ZYri.webp";
import img3 from "../../assets/images/YAjbUZ83xrCtvpfs7YFRYmuf.webp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const TradingPage = () => {
  return (
    <>
      <Navbar />
      <div className="trade_section_header">
        <h3>All Games</h3>
        <span>1245 items</span>
      </div>
      <div className="trade_page_container">
        <TradeGameContainer
          img={img}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Call of Duty®: Modern Warfare® II"
        />
        <TradeGameContainer
          img={img1}
          name="Call of Duty®: Modern Warfare® II"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img3}
          name="Fall Guys"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img3}
          name="Call of Duty®: Modern Warfare® II"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img2}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Fall Guys"
        />
        <TradeGameContainer
          img={img}
          name="Fall Guys"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img2}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img3}
          name="Call of Fall Guys II"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img1}
          name="EA SPORTS™ FIFA 23"
          tradeTo="Call of Duty®"
        />
        <TradeGameContainer
          img={img2}
          name="Fall Guys"
          tradeTo="Call of Duty®"
        />
      </div>
      <Footer />
    </>
  );
};

export default TradingPage;
