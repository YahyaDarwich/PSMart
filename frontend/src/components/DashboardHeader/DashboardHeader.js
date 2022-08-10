import React from "react";
import "./DashboardHeader.css";
import Cookies from "universal-cookie";

const DashboardHeader = (props) => {
  const logout = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.remove("TOKEN_ADMIN", { path: "/dash/" });
    window.location.href = "/access";
  };
  return (
    <>
      <div className="dash_header">
        <div>
          <h2>{props.title}</h2>
          <p>{props.subTitle}</p>
        </div>
        <button
          onClick={(e) => {
            logout(e);
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default DashboardHeader;
