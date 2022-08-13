import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import gif from "../../assets/gif/4047-404-animation.gif";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="not_found_Container">
        <img src={gif} alt="" />
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
