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
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

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
          <Route exact path="/add" element={<AddTradePage />} />
          <Route exact path="/dash/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
