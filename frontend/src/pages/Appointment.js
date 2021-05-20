import React, { useState, useEffect } from "react";
//styles
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as api from "../services/user.service";

//initial state for the new appointment
const initialState = {
  patientId: "",
  patientName: "",
  appointmentTime: "",
  doctorId: "",
};

const Appointment = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentList, setAppointmentList] = useState([]);
  const [newAppointmentButton, setNewAppointmentButton] = useState(false);
  const [newAppointment, setNewAppointment] = useState(initialState);

  const set = (name) => {
    return ({ target: { value } }) => {
      setNewAppointment((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const getData = async () => {
    let result = await api.getAppointments();
    setAppointmentList([...result.data]);
  };
  const searchPatient = async (e) => {
    e.preventDefault();
    let result = await api.searchPatient(newAppointment.patientId);
    let name = `${result.lastName}, ${result.firstName}`;

    setNewAppointment({ ...newAppointment, patientName: name });
  };
  const appointmentSubmit = async (e) => {
    e.preventDefault();
    api.addAppointment(newAppointment);
    setNewAppointmentButton(!newAppointmentButton);
    clearState();
    await getData();
  };

  const clearState = () => {
    setNewAppointment(initialState);
  };

  const toggleSideBar = () => {
    setNewAppointmentButton(!newAppointmentButton);
    clearState();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AddAppointment>
        <div>
          <div className="wrapper-btn">
            <button onClick={toggleSideBar}>Add Appointment</button>
          </div>
          <div
            className={`side-menu ${
              newAppointmentButton ? "active-side-menu" : ""
            }`}
          >
            <form onSubmit={searchPatient}>
              <div>
                <label htmlFor="patientId">Patient ID</label>
                <input
                  id="patientId"
                  value={newAppointment.patientId}
                  onChange={set("patientId")}
                  type="text"
                />
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </form>
            <div>
              <form onSubmit={appointmentSubmit}>
                <div>
                  <label htmlFor="patientName">Patient Name</label>
                  <input
                    id="patientName"
                    value={newAppointment.patientName}
                    type="text"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="appointment-time">Date & Time</label>
                  <input
                    id="appointment-time"
                    value={newAppointment.appointmentTime}
                    onChange={set("appointmentTime")}
                    type="datetime-local"
                  />
                </div>
                <div>
                  <label htmlFor="doctorId">Doctor ID</label>
                  <input
                    id="doctorId"
                    value={newAppointment.doctorId}
                    onChange={set("doctorId")}
                    type="text"
                  />
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AddAppointment>
      <Paper>
        <Scheduler data={appointmentList}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
          />
          <WeekView startDayHour={8} endDayHour={20} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};

const AddAppointment = styled.div`
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
  }
  .active-side-menu {
    transform: translateX(0);
    opacity: 1;
  }
  .wrapper-btn {
    text-align: end;
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

export default Appointment;
