import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AccessPage from "./pages/AccessPage/AccessPage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      
      {/* <AccessPage/> */}
  
  <BrowsePage/>
    </>
  );
}

export default App;
