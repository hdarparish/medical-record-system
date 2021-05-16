import React from "react";
import { Route, Redirect } from "react-router-dom";
import authHeader from "../services/auth-header";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        //check if the token exists and show the pages, else go to login
        authHeader() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
