//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
//components
import Footer from "./components/Footer";
import Nav from "./components/Nav";
//Router
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Login />
        <Home />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
