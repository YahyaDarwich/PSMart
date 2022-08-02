import React from "react";
import styled from "styled-components";
import "./DashboardHeader.css";

const DashboardHeader = (props) => {
  return (
    <>
      <div className="dash_header">
        <div>
          <h2>{props.title}</h2>
          <p>{props.subTitle}</p>
        </div>
        <button>Logout</button>
      </div>
    </>
  );
};

export default DashboardHeader;
