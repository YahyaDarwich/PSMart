import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import DashboardGenre from "../DashboardGenre/DashboardGenre";
import DashboardPlatform from "../DashboardPlatform/DashboardPlatform";
import DashboardGame from "../DashboardGame/DashboardGame";

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 65px;
`;
const Dashboard = () => {
  
  return (
    <>
      <div className="dashboard_container">
        <Sidebar />
        <ContentContainer>
          <Routes>
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
