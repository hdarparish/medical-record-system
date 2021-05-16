import React, { useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const Home = () => {
  const API_URL = "http://localhost:4000/";

  useEffect(() => {
    const getTable = async () => {
      // let history = useHistory();

      await axios
        .get(API_URL + "admin/viewPatients", {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          return err.response;
        });
    };
    getTable();
  }, []);

  return (
    <div>
      <p>This is the homepage</p>
    </div>
  );
};

export default Home;
