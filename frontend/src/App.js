import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AccessPage from "./pages/AccessPage/AccessPage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import GameInfoPage from "./pages/GameInfoPage/GameInfoPage";
import TradingPage from "./pages/TradingPage/TradingPage";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AddTradePage from "./pages/AddTradePage/AddTradePage";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/access" element={<AccessPage />} />
          <Route exact path="/browse" element={<BrowsePage />} />
          <Route exact path="/trading" element={<TradingPage />} />
          <Route exact path="/add" element={<AddTradePage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
