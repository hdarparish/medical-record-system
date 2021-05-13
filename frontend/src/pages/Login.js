import React from "react";
//styles
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
  return (
    <div className={classes.centered}>
      <div className={classes.logo}>
        <img src={Logo} alt="clinic logo" />
      </div>
      <form className={classes.login_form} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Username" />
        <TextField id="standard-basic" label="Password" type="password" />
        <div className={classes.submit_btn}>
          <Button variant="contained">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
