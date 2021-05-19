import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";

//styles
import styled from "styled-components";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [table, setTable] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({
    doctorId: "",
    firstName: "",
    lastName: "",
    specialization: "",
    department: "",
  });
  //get the patients table and the other states as false (only display one thing at a time)
  const getTable = async () => {
    let result = await api.getDoctors();
    setDoctors(result.data);
    setTable(true);
    setAddForm(false);
    setEditForm(false);
  };
  //view the add patients form and hide the table and edit table form
  const viewAddDoctor = (e) => {
    e.preventDefault();
    setAddForm(true);
    setEditForm(false);
    setTable(false);
  };
  //view the edit patients form and hide the table and add table form
  const viewEditDoctor = (e) => {
    e.preventDefault();
    setAddForm(false);
    setEditForm(true);
    setTable(false);
  };
  const submitNewDoctor = (e) => {
    e.preventDefault();
    api.addDoctor(doctorProfile);
  };
  const searchDoctor = async (e) => {
    e.preventDefault();
    let result = await api.searchDoctor(doctorProfile.doctorId);
    setDoctorProfile({
      doctorId: result.doctorId,
      firstName: result.firstName,
      lastName: result.lastName,
      specialization: result.specialization,
      department: result.department,
    });
  };
  const editDoctor = (e) => {
    e.preventDefault();
    api.editDoctor(doctorProfile);
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
    <div>
      <DoctorSelection>
        <button onClick={getTable}>Overview</button>
        <button onClick={viewAddDoctor}>Add Doctors</button>
        <button onClick={viewEditDoctor}>Edit Doctors</button>
      </DoctorSelection>

      {table && (
        <DoctorTable>
          <table>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {doctors &&
                doctors.map((row) => (
                  <tr key={row.doctorId}>
                    <td>{row.doctorId}</td>
                    <td>
                      {row.lastName}, {row.firstName}
                    </td>
                    <td>{row.specialization}</td>
                    <td>{row.department}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </DoctorTable>
      )}
      {addForm && (
        <AddDoctor>
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
        </AddDoctor>
      )}
      {editForm && (
        <EditDoctor>
          <div>
            <h2>Edit Doctor</h2>
          </div>
          <form onSubmit={searchDoctor}>
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
              <button type="submit">Search</button>
            </div>
          </form>

          <form onSubmit={editDoctor}>
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
        </EditDoctor>
      )}
    </div>
  );
};

const DoctorSelection = styled.div`
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

const AddDoctor = styled.div`
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

const EditDoctor = styled.div`
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

export default Doctor;
