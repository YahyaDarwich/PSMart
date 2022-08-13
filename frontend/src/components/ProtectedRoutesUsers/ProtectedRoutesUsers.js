import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN_USER");
  return <>{token ? <Outlet /> : <Navigate to="/access" />}</>;
};

export default ProtectedRoutes;
