import React from "react";
import "./Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <>
      <div className="footer_container">
        <div className="footer_info_section">
          <div className="footer--about">
            <div className="psmart__logo psrave--font">
              ps <span>m</span>
            </div>
            <p>
              Lebanon's First Cryptocurrency Fantasy Trading Gaming Platform
              Which Gives You Real Trading Experience
            </p>
          </div>
          <ul className="sitemap">
            <h3>Sitemap</h3>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Trading</a>
            </li>
            <li>
              <a href="">Browse</a>
            </li>
            <li>
              <a href="">Collections</a>
            </li>
          </ul>
          <div className="footer--subscribe">
            <h3>Subscribe</h3>
            <form action="#">
              <input
                type="email"
                placeholder="Your email address"
                name="subscribe"
              />
              <button>Send</button>
            </form>
            <div class="social-container">
            <FacebookIcon className="material-icons" fontSize="large" />
            <InstagramIcon className="material-icons" fontSize="large" />
            <TwitterIcon className="material-icons" fontSize="large" />
            </div>
          </div>
        </div>
        <div className="footer_copyright_section">
          <div id="copyright">
          &copy; 2022 All Rights Reserved by <span>PSmart</span>
          </div>
          <div className="logo__container">
            <a href="home">
              <div className="psmart__name psrave--font">
                ps
                <span>mart</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
