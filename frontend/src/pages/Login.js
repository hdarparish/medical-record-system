import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useHistory, useLocation } from "react-router-dom";
//styles
import styled from "styled-components";

//logo
import Logo from "../img/New-Horizon.png";

const Login = () => {
  // const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(true);
  const [message, setMessage] = useState("");

  const loginSubmit = async (event) => {
    event.preventDefault();
    console.log(username);
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
    <Wrapper>
      <div>
        <img src={Logo} alt="clinic logo" />
      </div>
      {!auth && (
        <Alert>
          <h2>Error: {message}</h2>
        </Alert>
      )}
      <form onSubmit={loginSubmit} noValidate autoComplete="off">
        <div>
          <label htmlFor="Username">Username</label>
          <input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <button variant="contained" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Alert = styled.div`
  background: #eb9898;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      flex: 1;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: none;
      margin-top: 1rem;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    }
    label {
      flex: 1;
      margin: 1rem 1rem 0rem 0rem;
      font-size: 1.5rem;
    }
    button {
      font-size: 1.5rem;
      border: none;
      margin-top: 1rem;
      padding: 0.5rem 2rem;
      cursor: pointer;
      background: #5e8ec4;
      color: white;
      &:hover {
        opacity: 0.7;
        transition: 0.3;
      }
    }
  }
`;

export default Login;
