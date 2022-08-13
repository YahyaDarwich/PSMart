import React from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { userToken } from "../../utils/Token";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Cookies from "universal-cookie";

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
  const click_avatar = () => {
    const menu = document.getElementById("user_menu");
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  };

  const logout = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.remove("TOKEN_USER", { path: "/" });
    window.location.href = "/access";
  };
  return (
    <>
      <header className="navbar__container" id="navbar__container">
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
            <CloseRoundedIcon className="material-icons" fontSize="large" />
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
              <a className="nav__link" href="#footer_container">
                Contact us
              </a>
            </li>
            {userToken ? (
              <>
                <li className="nav__item" id="profile">
                  <a href="manage" className="nav__link">
                    Manage
                  </a>
                </li>
                <li className="nav__item" id="add-game">
                  <a href="add" className="nav__link">
                    Add Game
                  </a>
                </li>
                <li
                  className="nav__item"
                  id="logout"
                  onClick={(e) => {
                    logout(e);
                  }}
                >
                  <a
                    href="#"
                    className="nav__link"
                    onClick={(e) => {
                      logout(e);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          {!userToken ? (
            <div className="links_logged" id="menu__button">
              <ul>
                <li className="sign_in">
                  <a href="access">Sign in</a>
                </li>
                <li className="sign_up">
                  <a href="access">Register</a>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </nav>
        {userToken ? (
          <div className="avatar" onClick={click_avatar}>
            <span>Yahya Darwich</span>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 35,
                height: 35,
                fontSize: 19,
              }}
            >
              Y
            </Avatar>
            <div className="user_menu" id="user_menu">
              <li className="item">
                <a href="/manage">Manage</a>
              </li>
              <li className="item">
                <a href="/add">Add Game</a>
              </li>
              <li className="item">
                <a
                  href="#"
                  onClick={(e) => {
                    logout(e);
                  }}
                >
                  Logout
                </a>
              </li>
            </div>
          </div>
        ) : (
          <div className="links_logged">
            <ul>
              <li className="divider">
                <span></span>
              </li>
              <li className="sign_in">
                <a href="access">Sign in</a>
              </li>
              <li className="sign_up">
                <a href="access">Register</a>
              </li>
            </ul>
          </div>
        )}

        <div onClick={open_Menu} className="menu--open">
          <MenuIcon className="material-icons " fontSize="large" />
        </div>
      </header>
    </>
  );
};

export default Navbar;
