//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Doctor from "./pages/Doctor";
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
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/patients">
              <Patients />
            </Route>
            <Route path="/doctors">
              <Doctor />
            </Route>
            <Footer />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
