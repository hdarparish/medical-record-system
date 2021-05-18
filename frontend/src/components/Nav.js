import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

import { useHistory } from "react-router-dom";
//styles
import styled from "styled-components";

const Nav = () => {
  //const classes = useStyles();
  let history = useHistory();

  const logout = (event) => {
    // event.preventDefault();
    AuthService.logout();
    history.push("/login");
  };
  return (
    <Navbar>
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
          <span onClick={logout}>Logout</span>
        </li>
      </ul>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 1.5rem;
  background: #616199;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  ul {
    list-style: none;
    padding: 0;
    a {
      text-decoration: none;
      color: whitesmoke;
      &:hover {
        color: #bea1a1;
      }
    }
    span {
      cursor: pointer;
      color: white;
    }
  }
`;

export default Nav;
