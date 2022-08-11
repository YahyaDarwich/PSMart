import React from "react";
import "./BrowsePage.css";
import BrowseGameContainer from "../../components/BrowseGameContainer/BrowseGameContainer";
import img from "../../assets/images/MkbqF5veMFZnmQRtsbmQoNZT.webp";
import img1 from "../../assets/images/E2vZwVaDJbhLZpJo7Q10IyYo.webp";
import img2 from "../../assets/images/sSOaeqXF28TQQlUGhEQ7ZYri.webp";
import img3 from "../../assets/images/YAjbUZ83xrCtvpfs7YFRYmuf.webp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const BrowsePage = () => {
  return (
    <>
      <Navbar />
      <div className="browse_section_header">
        <h3>All Games</h3>
        <span>1245 items</span>
      </div>
      <div className="browse_container">
        <BrowseGameContainer img={img} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer
          img={img1}
          name="Call of Duty®: Modern Warfare® II"
        />
        <BrowseGameContainer img={img} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer img={img3} name="Fall Guys" />
        <BrowseGameContainer img={img} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer
          img={img3}
          name="Call of Duty®: Modern Warfare® II"
        />
        <BrowseGameContainer img={img2} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer img={img} name="Fall Guys" />
        <BrowseGameContainer img={img2} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer
          img={img3}
          name="Call of Duty®: Modern Warfare® II"
        />
        <BrowseGameContainer img={img1} name="EA SPORTS™ FIFA 23" />
        <BrowseGameContainer img={img2} name="Fall Guys" />
      </div>
      <Footer />
    </>
  );
};

export default BrowsePage;
