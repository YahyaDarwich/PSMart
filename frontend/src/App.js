import "./App.css";
import AccessPage from "./pages/AccessPage/AccessPage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import TradingPage from "./pages/TradingPage/TradingPage";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AddTradePage from "./pages/AddTradePage/AddTradePage";
import ManagePage from "./pages/ManagePage/ManagePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoutesUsers from "./components/ProtectedRoutesUsers/ProtectedRoutesUsers";
import ProtectedRoutesDash from "./components/ProtectedRoutesDash/ProtectedRoutesDash";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/access" element={<AccessPage />} />
          <Route exact path="/browse" element={<BrowsePage />} />
          <Route exact path="/trading" element={<TradingPage />} />
          <Route exact path="/*" element={<NotFoundPage />} />
          <Route exact element={<ProtectedRoutesUsers />}>
            <Route exact path="/add" element={<AddTradePage />} />
            <Route exact path="/manage" element={<ManagePage />} />
          </Route>
          <Route exact element={<ProtectedRoutesDash />}>
            <Route exact path="/dash/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
