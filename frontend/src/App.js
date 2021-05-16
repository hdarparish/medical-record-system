//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
//components
import Footer from "./components/Footer";
import Nav from "./components/Nav";

import PrivateRoute from "./components/PrivateRoute";
//Router
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/">
            <Nav />
            <Home />
            <Footer />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
