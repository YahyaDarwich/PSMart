import React from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Navbar = () => {
  const open_Menu = () => {
    const nav_menu = document.getElementById("nav__menu");
    const menu_overlay = document.getElementById("mobile-menu_overlay");
    nav_menu.style.right = "0";
    menu_overlay.style.visibility = "visible";
    menu_overlay.style.opacity = "1";
  };
  const close_Menu = () => {
    const nav_menu = document.getElementById("nav__menu");
    const menu_overlay = document.getElementById("mobile-menu_overlay");
    nav_menu.style.right = "-100%";
    menu_overlay.style.visibility = "hidden";
    menu_overlay.style.opacity = "0";
  };
  const click_overlay = () => {
    close_Menu();
  };
  return (
    <>
      <header className="navbar__container">
        <div className="logo__container">
          {/* <div className="psmart__logo psrave--font">ps <span>m</span></div> */}
          <a href="home">
            <div className="psmart__name psrave--font">
              ps
              <span>mart</span>
            </div>
          </a>
        </div>
        <div id="mobile-menu_overlay" onClick={click_overlay}></div>
        <nav className="nav" id="nav__menu">
          <div onClick={close_Menu} className="menu--close">
            <CloseRoundedIcon className="material-icons " fontSize="large" />
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <a href="home" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="trading" className="nav__link">
                Trading
              </a>
            </li>
            <li className="nav__item">
              <a href="browse" className="nav__link">
                Browse
              </a>
            </li>
            <li className="nav__item">
              <a href="collections" className="nav__link">
                Collections
              </a>
            </li>
            <li className="nav__item">
              <a href="contactus" className="nav__link">
                Contact us
              </a>
            </li>
          </ul>
        </nav>
        <div className="links_logged">
          <ul>
            <li className="divider">
              <span></span>
            </li>
            <li className="sign_in">
              <a href="">Sign in</a>
            </li>
            <li className="sign_up">
              <a href="">Sign up</a>
            </li>
          </ul>
        </div>
        <div onClick={open_Menu} className="menu--open">
          <MenuIcon className="material-icons " fontSize="large" />
        </div>
      </header>
    </>
  );
};

export default Navbar;
