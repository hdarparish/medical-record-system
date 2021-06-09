import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";

//styles
import styled from "styled-components";

const initialState = {
  doctorId: "",
  firstName: "",
  lastName: "",
  specialization: "",
  department: "",
};

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState(initialState);

  const getTable = async () => {
    let result = await api.getDoctors();
    setDoctors(result.data);
  };

  const toggleAddDoctor = () => {
    setDoctorProfile(initialState);
    setAddForm(!addForm);
  };
  const toggleEditDoctor = (e) => {
    let doctorId = Number(e.target.parentElement.parentNode.id);
    let result = doctors.filter((item) => item.doctorId === doctorId)[0];
    setEditForm(!editForm);
    setDoctorProfile(result);
  };
  const submitNewDoctor = (e) => {
    e.preventDefault();
    api.addDoctor(doctorProfile);
  };

  const editDoctor = (e) => {
    e.preventDefault();
    api.editDoctor(doctorProfile);
  };
  const deleteDoctor = (e) => {
    e.preventDefault();
    api.deleteDoctor(doctorProfile.doctorId);
  };
  const set = (name) => {
    return ({ target: { value } }) => {
      setDoctorProfile((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  useEffect(() => {
    getTable();
  }, []);
  return (
    <DoctorPage>
      <div className="wrapper-btn">
        <button onClick={toggleAddDoctor}>Add Doctors</button>
      </div>
      <div className={`side-menu ${addForm ? "active-side-menu" : ""}`}>
        <div>
          <h2>Add Doctor</h2>
        </div>
        <form onSubmit={submitNewDoctor}>
          <div>
            <label htmlFor="doctorId">Doctor ID</label>
            <input
              value={doctorProfile.doctorId}
              onChange={set("doctorId")}
              id="doctorId"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={doctorProfile.firstName}
              onChange={set("firstName")}
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={doctorProfile.lastName}
              onChange={set("lastName")}
              id="lastName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="specialization">Specialization</label>
            <input
              value={doctorProfile.specialization}
              onChange={set("specialization")}
              id="specialization"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              value={doctorProfile.department}
              onChange={set("department")}
              id="department"
              type="text"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {doctors && (
        <DoctorTable>
          <table>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors &&
                doctors.map((row) => (
                  <tr key={row.doctorId} id={row.doctorId}>
                    <td>{row.doctorId}</td>
                    <td>
                      {row.lastName}, {row.firstName}
                    </td>
                    <td>{row.specialization}</td>
                    <td>{row.department}</td>
                    <td>
                      <button onClick={toggleEditDoctor}>Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </DoctorTable>
      )}
      <div className={`side-menu ${editForm ? "active-side-menu" : ""}`}>
        <div>
          <h2>Edit Doctor</h2>
        </div>
        <form onSubmit={editDoctor}>
          <div>
            <label htmlFor="doctorId">Doctor ID</label>
            <input
              value={doctorProfile.doctorId}
              onChange={set("doctorId")}
              id="doctorId"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={doctorProfile.firstName}
              onChange={set("firstName")}
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={doctorProfile.lastName}
              onChange={set("lastName")}
              id="lastName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="specialization">Specialization</label>
            <input
              value={doctorProfile.specialization}
              onChange={set("specialization")}
              id="specialization"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              value={doctorProfile.department}
              onChange={set("department")}
              id="department"
              type="text"
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
          <div className="edit-doctor-delete">
            <button type="submit" onClick={deleteDoctor}>
              Delete Doctor
            </button>
          </div>
        </form>
      </div>
    </DoctorPage>
  );
};

const DoctorPage = styled.div`
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
  .edit-doctor-delete {
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

const DoctorTable = styled.div`
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

export default Doctor;
