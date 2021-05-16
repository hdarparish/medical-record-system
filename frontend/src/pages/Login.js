import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory, useLocation } from "react-router-dom";
//styles
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
//logo
import Logo from "../img/New-Horizon.png";

const useStyles = makeStyles((theme) => ({
  login_form: {
    "& > *": {
      marginTop: theme.spacing(1),
      width: "60%",
    },
  },
  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  logo: {
    width: "100%",
    textAlign: "center",
    "& img": {
      width: "60%",
    },
  },
  submit_btn: {
    width: "100%",
    "& button": {
      width: "60%",
    },
  },
}));
const Login = () => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(true);
  const [message, setMessage] = useState("");

  const loginSubmit = async (event) => {
    event.preventDefault();

    let response = await AuthService.login(username, password);

    if (response.status >= 400) {
      setAuth(false);
      setMessage(response.data.message);
    } else {
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  };

  return (
    <div className={classes.centered}>
      <div className={classes.logo}>
        <img src={Logo} alt="clinic logo" />
      </div>
      {!auth && (
        <Alert severity="error">
          <AlertTitle>Error: {message}</AlertTitle>
        </Alert>
      )}
      <form
        className={classes.login_form}
        onSubmit={loginSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.submit_btn}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
