import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";

//styles
import styled from "styled-components";

const initialState = {
  patientId: "",
  firstName: "",
  lastName: "",
  birthDay: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [patientProfile, setPatientProfile] = useState(initialState);
  //get the patients table and the other states as false (only display one thing at a time)
  const getTable = async () => {
    let result = await api.getPatients();
    setPatients(result.data);
  };
  //toggle the add patients form
  const toggleAddPatient = (e) => {
    e.preventDefault();
    setPatientProfile(initialState);
    setAddForm(!addForm);
  };

  const toggleEditPatient = (e) => {
    let patientId = Number(e.target.parentElement.parentNode.id);
    let result = patients.filter((item) => item.patientId === patientId)[0];
    setEditForm(!editForm);
    setPatientProfile(result);
  };

  const submitNewPatient = (e) => {
    e.preventDefault();
    api.addPatient(patientProfile);
  };
  const editPatient = (e) => {
    e.preventDefault();
    api.editPatient(patientProfile);
  };
  const deletePatient = (e) => {
    e.preventDefault();
    api.deletePatient(patientProfile.patientId);
  };
  const set = (name) => {
    return ({ target: { value } }) => {
      setPatientProfile((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  useEffect(() => {
    getTable();
  }, []);
  return (
    <PatientPage>
      <div className="wrapper-btn">
        <button onClick={toggleAddPatient}>Add Patients</button>
      </div>

      {patients && (
        <PatientsTable>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients.map((row) => (
                  <tr key={row.patientId} id={row.patientId}>
                    <td>{row.patientId}</td>
                    <td>
                      {row.lastName}, {row.firstName}
                    </td>
                    <td>{row.birthDay.split("T")[0]}</td>
                    <td>{row.gender}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.address}</td>
                    <td>
                      <button onClick={toggleEditPatient}>Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </PatientsTable>
      )}
      <div className={`side-menu ${addForm ? "active-side-menu" : ""}`}>
        <div>
          <h2>Add Patient</h2>
        </div>
        <form onSubmit={submitNewPatient}>
          <div>
            <label htmlFor="patientId">Patient ID</label>
            <input
              value={patientProfile.patientId}
              onChange={set("patientId")}
              id="patientId"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={patientProfile.firstName}
              onChange={set("firstName")}
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={patientProfile.lastName}
              onChange={set("lastName")}
              id="lastName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="birthDay">Date of Birth</label>
            <input
              value={patientProfile.birthDay}
              onChange={set("birthDay")}
              id="birthDay"
              type="date"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <input
              value={patientProfile.gender}
              onChange={set("gender")}
              id="gender"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              value={patientProfile.phoneNumber}
              onChange={set("phoneNumber")}
              id="phoneNumber"
              type="number"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={patientProfile.email}
              onChange={set("email")}
              id="email"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              value={patientProfile.address}
              onChange={set("address")}
              id="address"
              type="text"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className={`side-menu ${editForm ? "active-side-menu" : ""}`}>
        <div>
          <h2>Edit Patient</h2>
        </div>
        <form onSubmit={editPatient}>
          <div>
            <label htmlFor="patientId">Patient ID</label>
            <input
              value={patientProfile.patientId}
              onChange={set("patientId")}
              id="patientId"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={patientProfile.firstName}
              onChange={set("firstName")}
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={patientProfile.lastName}
              onChange={set("lastName")}
              id="lastName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="birthDay">Date of Birth</label>
            <input
              value={patientProfile.birthDay}
              onChange={set("birthDay")}
              id="birthDay"
              type="date"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <input
              value={patientProfile.gender}
              onChange={set("gender")}
              id="gender"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              value={patientProfile.phoneNumber}
              onChange={set("phoneNumber")}
              id="phoneNumber"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={patientProfile.email}
              onChange={set("email")}
              id="email"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              value={patientProfile.address}
              onChange={set("address")}
              id="address"
              type="text"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="edit-patient-delete">
          <button type="submit" onClick={deletePatient}>
            Delete Patient
          </button>
        </div>
      </div>
    </PatientPage>
  );
};

const PatientPage = styled.div`
  font-family: "Roboto", sans-serif;
  .wrapper-btn {
    text-align: end;
  }
  button {
    flex: 1;
    font-size: 1.5rem;
    border: none;
    margin-top: 0.5rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #5e8ec4;
    color: white;
    &:hover {
      opacity: 0.7;
      transition: 0.3;
    }
  }
  .side-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 50rem;
    height: 100%;
    box-shadow: 2px 2px 50px rgb(179, 178, 178);
    transform: translateX(-100%);
    transition: all 0.5s ease;
    opacity: 0;
    z-index: 5;
    background: white;
  }
  .active-side-menu {
    transform: translateX(0);
    opacity: 1;
  }
  h2 {
    font-size: 2.5rem;
    padding: 0.5rem;
    margin-top: 1rem;
  }
  form {
    margin: 3rem;

    div {
      display: flex;
    }
    input {
      flex: 1;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: none;
      margin-top: 1rem;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
      flex: 1;
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
  .edit-patient-delete {
    display: flex;
    h2 {
      flex: 1;
    }
    button {
      position: fixed;
      bottom: 0;
      left: 50%;
      width: 20rem;
      margin: 1rem;
      background-color: #a00808;
    }
  }
`;

const PatientsTable = styled.div`
  table {
    margin-top: 1rem;
    width: 100%;
    border: 1px solid black;
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    td {
      text-align: center;
    }
  }
`;

export default Patients;
