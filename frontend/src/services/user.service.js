import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/";

const getPatients = () => {
  return axios.get(API_URL + "patients", { headers: authHeader() });
};

const addPatient = async (patient) => {
  return await axios
    .post(API_URL + "patient", {
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
    .put(API_URL + `patient`, {
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

const deletePatient = async (patientId) => {
  return await axios
    .delete(API_URL + `patient/${patientId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

const getDoctors = () => {
  return axios.get(API_URL + "doctors", { headers: authHeader() });
};

const addDoctor = async (doctor) => {
  return await axios
    .post(API_URL + "doctor", {
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

/* const searchDoctor = async (doctorId) => {
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
 */
const editDoctor = async (doctor) => {
  return await axios
    .put(API_URL + "doctor", {
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

const deleteDoctor = async (doctorId) => {
  return await axios
    .delete(API_URL + `doctor/${doctorId}`, {
      headers: authHeader(),
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
    .post(API_URL + "appointment", {
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
  return axios.get(API_URL + "bills", { headers: authHeader() });
};

const addBill = async (data) => {
  return await axios
    .post(API_URL + "bill", {
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

const deleteBill = async (billId) => {
  return await axios
    .delete(API_URL + `bill/${billId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err.response;
    });
};

export {
  getPatients,
  addPatient,
  searchPatient,
  editPatient,
  deletePatient,
  getDoctors,
  addDoctor,
  editDoctor,
  deleteDoctor,
  getAppointments,
  addAppointment,
  getBills,
  addBill,
  deleteBill,
};
