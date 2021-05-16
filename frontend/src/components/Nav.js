import React from "react";
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
            <Button color="inherit">Home</Button>
            <Button color="inherit">Patients</Button>
            <Button color="inherit">Doctors</Button>
            <Button color="inherit">Appointments</Button>
            <Button color="inherit">Billings</Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
