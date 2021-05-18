import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";

//styles
import styled from "styled-components";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [table, setTable] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [patientProfile, setPatientProfile] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    BirthDay: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  //get the patients table and the other states as false (only display one thing at a time)
  const getTable = async () => {
    let result = await api.getPatients();
    setPatients(result.data);
    setTable(true);
    setAddForm(false);
    setEditForm(false);
  };
  //view the add patients form and hide the table and edit table form
  const viewAddPatient = (e) => {
    e.preventDefault();
    setAddForm(true);
    setEditForm(false);
    setTable(false);
  };
  //view the edit patients form and hide the table and add table form
  const viewEditPatient = (e) => {
    e.preventDefault();
    setAddForm(false);
    setEditForm(true);
    setTable(false);
  };
  const submitNewPatient = (e) => {
    e.preventDefault();
    api.addPatient(patientProfile);
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
    <div>
      <PatientSelection>
        <button onClick={getTable}>Overview</button>
        <button onClick={viewAddPatient}>Add Patients</button>
        <button onClick={viewEditPatient}>Edit Patients</button>
      </PatientSelection>

      {table && (
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
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients.map((row) => (
                  <tr key={row.patientId}>
                    <td>{row.patientId}</td>
                    <td>
                      {row.lastName}, {row.firstName}
                    </td>
                    <td>{row.birthDay.toLocaleString()}</td>
                    <td>{row.gender}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </PatientsTable>
      )}
      {addForm && (
        <AddPatient>
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
        </AddPatient>
      )}
      {editForm && (
        <EditPatient>
          <div>
            <h2>Edit Patient</h2>
          </div>
          <form>
            <div>
              <label htmlFor="patientId">Patient ID</label>
              <input id="patientId" type="text" />
            </div>
            <div>
              <button>Search</button>
            </div>
          </form>

          <form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="birthDay">Date of Birth</label>
              <input id="birthDay" type="date" />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <input id="gender" type="text" />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="text" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input id="address" type="text" />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </EditPatient>
      )}
    </div>
  );
};

const PatientSelection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

const AddPatient = styled.div`
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
`;

const EditPatient = styled.div`
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
`;

export default Patients;
