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

const Appointment = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentList, setAppointmentList] = useState([]);

  /*   const appointments = [
    {
      title: "Website Re-Design Plan",
      startDate: new Date(2018, 5, 25, 9, 35),
      endDate: new Date(2018, 5, 25, 11, 30),
      id: 0,
      location: "Room 1",
    },
  ]; */

  const getData = async () => {
    let result = await api.getAppointments();
    setAppointmentList([...result.data]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Schedule>
      <div>
        <button>Add Appointment</button>
      </div>
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
    </Schedule>
  );
};

const Schedule = styled.div``;

export default Appointment;
