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

const searchPatient = async (patientId) => {
  return await axios
    .post(API_URL + "searchPatient", {
      headers: authHeader(),
      patientId,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      return err.response;
    });
};

const editPatient = async (patient) => {
  return await axios
    .post(API_URL + "editPatient", {
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

const getDoctors = () => {
  return axios.get(API_URL + "admin/viewDoctors", { headers: authHeader() });
};

const addDoctor = async (doctor) => {
  return await axios
    .post(API_URL + "admin/addDoctor", {
      headers: authHeader(),
      doctor,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

const searchDoctor = async (doctorId) => {
  return await axios
    .post(API_URL + "admin/searchDoctor", {
      headers: authHeader(),
      doctorId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

const editDoctor = async (doctor) => {
  return await axios
    .post(API_URL + "admin/editDoctor", {
      headers: authHeader(),
      doctor,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

const getAppointments = () => {
  return axios.get(API_URL + "appointments", { headers: authHeader() });
};

const addAppointment = async (data) => {
  return await axios
    .post(API_URL + "addAppointment", {
      headers: authHeader(),
      data,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

const getBills = async () => {
  return axios.get(API_URL + "viewBills", { headers: authHeader() });
};

const addBill = async (data) => {
  return await axios
    .post(API_URL + "addBill", {
      headers: authHeader(),
      data,
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
  searchPatient,
  editPatient,
  getDoctors,
  addDoctor,
  searchDoctor,
  editDoctor,
  getAppointments,
  addAppointment,
  getBills,
  addBill,
};
