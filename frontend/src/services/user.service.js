import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getPatients = () => {
  return axios.get(API_URL + "admin/viewPatients", { headers: authHeader() });
};

const addPatient = async (patient) => {
  return await axios
    .post(API_URL + "addNewPatient", {
      headers: authHeader(),
      patient,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

export {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getPatients,
  addPatient,
};
