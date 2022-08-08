import React from "react";
import "./Sidebar.css";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RuleIcon from "@mui/icons-material/Rule";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

const Sidebar = () => {
  const openMenu = () => {
    const menu = document.querySelector(".st-menu");
    const dash = document.querySelector(".dashboard_container");
    dash.classList.toggle("overlay");
    menu.classList.toggle("hide");
  };

  return (
    <>
      <div id="st-container" className="st-container .st-menu-open">
        <nav className="st-menu st-effect-1" id="menu-1">
          <div className="open-close-menu">
            <MenuIcon
              fontSize="large"
              onClick={openMenu}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="profile-box">
            <Stack direction="row">
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 75,
                  height: 75,
                  fontSize: 30,
                }}
              >
                Y
              </Avatar>
            </Stack>
            <span>Yahya Darwich</span>
          </div>
          <ul>
            <li>
              <a className="icon icon-data" href="tradedgames">
                <span>Tradded Games</span>
                <RuleIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a className="icon icon-location" href="games">
                <span>Games</span>
                <SportsEsportsIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a className="icon icon-study" href="genre">
                <span>Genres</span>
                <CategoryIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a className="icon icon-photo" href="platform">
                <span>Platforms</span>
                <QueuePlayNextIcon fontSize="large" />
              </a>
            </li>
            <li>
              <a className="icon icon-wallet" href="access">
                <span>Admins</span>
                <AdminPanelSettingsIcon fontSize="large" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
