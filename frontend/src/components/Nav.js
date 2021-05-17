import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    justifyContent: "space-evenly",
    flex: 1,
    "& ul": {
      listStyle: "none",
      "& a": {
        textDecoration: "none",
        color: "white",
      },
    },
  },
}));

const Nav = () => {
  const classes = useStyles();
  let history = useHistory();

  const logout = (event) => {
    // event.preventDefault();
    AuthService.logout();
    history.push("/login");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/patients">Patients</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/appointments">Appointments</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/billings">Billings</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </li>
            </ul>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
