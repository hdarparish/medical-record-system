import express, { request, response } from "express";
import db from "./db.js";

const router = express.Router();

router.get("/", (request, response) => {
  let message = "";
  response.render("login.ejs", {
    message: message,
    pageId: "Login",
    title: "Login",
  });
});

router.get("/patient", (request, response) => {
  let message = "";
  response.render("patient.ejs", {
    message: message,
    pageId: "welcome",
    title: "Welcome",
  });
});

//User login
router.post("/login", (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  try {
    if (request.method == "POST") {
      let query = "Select * from users where username = ?";
      db.query(query, [username], (err, result) => {
        if (err) throw err;
        //check if there is a result from the query
        if (result.length > 0) {
          //check if the password matches the one entered
          if (password == result[0].password) {
            return response.status(200).redirect("/mainpage");
          }
        }
        return response.status(401).redirect("/");
      });
    }
  } catch (err) {
    console.error(err);
    // next(err);
  }
});

router.get("/mainpage", (request, response) => {
  response.render("mainpage.ejs", {
    message: "",
    title: "Homepage",
  });
});

router.get("/viewdoctor", (request, response) => {
  response.render("doctor.ejs", {
    message: "",
    title: "Homepage",
  });
});

router.get("/viewSearchPatient", (request, response) => {
  return response.render("searchPatient.ejs", {
    title: "Search Patient",
    message: "",
  });
});

//search by ID/OHIP number
router.post("/searchPatient", (request, response) => {
  let id = request.body.health_number;

  let query = `Select * from patients where ohip = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      //return response.status(200).redirect('/editprofile')
      // return response.status(200).send({ result });

      return response.render("patient.ejs", {
        title: "View Patient",
        patient: result[0],
        message: "",
      });
    } else {
      return response.render("addPatient.ejs", {
        title: "Add Patient",
        health_number: id,
        message: "",
      });
    }
  });
});

router.post("/addNewPatient", (request, response) => {
  let id = request.body.health_number;
  let firstName = request.body.first_name;
  let lastName = request.body.last_name;
  let birthDay = request.body.dateof_birth;
  let address = request.body.address;
  let gender = request.body.gender;
  let email = request.body.email;
  let phoneNumber = request.body.phone_number;

  let queryId = `SELECT * FROM health_system.patients WHERE ohip = ? `;
  db.query(queryId, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return response
        .status(400)
        .send({ message: "Invalid ID, patient exists" });
    } else {
      let query = `INSERT INTO health_system.patients
    (ohip, first_name, last_name, phone_number, dateof_birth, email, gender, address)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        query,
        [
          id,
          firstName,
          lastName,
          phoneNumber,
          birthDay,
          email,
          gender,
          address,
        ],
        (err, result) => {
          if (err) throw err;
          return response.status(200).send({ message: "Profile Added" });
        }
      );
    }
  });
});

router.put("/editprofile/:id", (request, response) => {
  let id = request.params.id;
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let birthDay = request.body.birthDay;
  let address = request.body.address;
  let gender = request.body.gender;
  let email = request.body.email;
  let phoneNumber = request.body.phoneNumber;
  let query =
    "UPDATE health_system.patients SET first_name= ?, last_name= ?, phone_number= ?, dateof_birth= ?, email= ?, gender= ?, address= ? WHERE ohip= ?";
  db.query(
    query,
    [firstName, lastName, phoneNumber, birthDay, email, gender, address, id],
    (err, result) => {
      if (err) throw err;
      return response.status(200).send({ message: "Profile Updated" });
    }
  );
});

router.get("/viewBills", (request, response) => {
  let query = `select  bill_number, patients.ohip, first_name, last_name, phone_number, email, billing.amount from patients, billing where patients.ohip = billing.ohip;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    return response.render("viewBills.ejs", {
      title: "View Billings",
      billing: result,
      message: "",
    });
  });
});
router.get("/viewAddBill", (request, response) => {
  return response.render("addBills.ejs", {
    title: "Add Bill",
    message: "",
  });
});

router.post("/addBill", (request, response) => {
  let ohip = request.body.ohip_number;
  let amount = request.body.amount;

  let query = `INSERT INTO billing (ohip,amount) values (?,?)`;
  db.query(query, [ohip, amount], (err, result) => {
    if (err) throw err;
    return response.redirect("/viewBills");
  });
});

router.get("/viewAppointment", (request, response) => {
  let query = `select appointment_time, appointment.ohip, patients.last_name as patient_lname, patients.first_name, doctors.doctor_id, doctors.last_name  from appointment, patients, doctors where appointment.ohip = patients.ohip and doctors.doctor_id = appointment.doctor_id
  `;
  db.query(query, (err, result) => {
    if (err) throw err;
    return response.render("viewAppointment.ejs", {
      title: "View appointments",
      appointments: result,
      message: "",
    });
  });
});

router.get("/viewaddAppointment", (request, response) => {
  return response.render("addAppointment.ejs", {
    title: "Add Appointment",
    message: "",
  });
});

router.post("/addAppointment", (request, response) => {
  let patient_id = request.body.ohip_number;
  let appointment_time = request.body.appointment_time;
  let doctor_id = request.body.referred_doctor;

  let query = `INSERT INTO appointment (ohip,appointment_time,doctor_id) values (?,?,?)`;
  db.query(query, [patient_id, appointment_time, doctor_id], (err, result) => {
    if (err) throw err;
    return response.redirect("/viewAppointment");
  });
});

export default router;
