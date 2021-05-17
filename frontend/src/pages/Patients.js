import React, { useEffect, useState } from "react";
import * as api from "../services/user.service";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const Patients = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const getTable = async () => {
      let result = await api.getPatients();
      setPatients(result.data);
    };
    getTable();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients &&
              patients.map((patient) => (
                <TableRow key={patient.patientId}>
                  <TableCell component="th" scope="row">
                    {patient.patientId}
                  </TableCell>
                  <TableCell>
                    {patient.lastName}, {patient.firstName}
                  </TableCell>
                  <TableCell>{patient.birthDay}</TableCell>
                  <TableCell>{patient.phoneNumber}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Patients;
