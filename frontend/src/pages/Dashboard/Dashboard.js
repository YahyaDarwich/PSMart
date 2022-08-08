import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import DashboardGenre from "../DashboardGenre/DashboardGenre";
import DashboardPlatform from "../DashboardPlatform/DashboardPlatform";
import DashboardGame from "../DashboardGame/DashboardGame";
import DashTradedGames from "../DashTradedGames/DashTradedGames";

const ContentContainer = styled.div`
  width: 100%;
  padding-left: 65px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Dashboard = () => {
  
  return (
    <>
      <div className="dashboard_container">
        <Sidebar />
        <ContentContainer>
          <Routes>
            <Route path="/tradedgames" element={<DashTradedGames />} />
            <Route path="/games" element={<DashboardGame />} />
            <Route path="/genre" element={<DashboardGenre />} />
            <Route path="/platform" element={<DashboardPlatform />} />
          </Routes>
        </ContentContainer>
      </div>
    </>
  );
};

export default Dashboard;
