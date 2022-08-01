import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import DashboardGenre from "../DashboardGenre/DashboardGenre";

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 80px;
`;
const Dashboard = () => {
  return (
    <>
      <div className="dashboard_container">
        <Sidebar />
        <ContentContainer>
          <Routes>
            <Route path="/genre" element={<DashboardGenre />} />
          </Routes>
        </ContentContainer>
      </div>
    </>
  );
};

export default Dashboard;
