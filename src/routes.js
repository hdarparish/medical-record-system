import express, { request, response } from "express";
import * as db from "./db.js";

const router = express.Router();

router.get("/", (request, response) => {
  let message = "";
  response.render("login.ejs", {
    message: "",
    pageId: "Login",
    title: "Login",
  });
});

//User login
router.post("/login", async (request, response) => {
  let password = request.body.password;
  try {
    db.userLogin(request.body).then((result) => {
      if (result.length > 0) {
        //check if the password matches the one entered
        if (password == result[0].password) {
          return response.status(200).redirect("/mainpage");
        }
      }
      return response.status(401).redirect("/");
    });
  } catch (err) {
    return response.status(401).redirect("/");
  }
});

router.get("/mainpage", (request, response) => {
  response.render("mainpage.ejs", {
    message: "",
    title: "Homepage",
  });
});

router.get("/patient", (request, response) => {
  response.render("patient.ejs", {
    message: "",
    pageId: "welcome",
    title: "Welcome",
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

  db.searchPatient(id).then((result) => {
    if (result.length > 0) {
      db.searchPatientHistory(id).then((medicalResult) => {
        return response.render("patientDash1.ejs", {
          title: "View Patient",
          patientProfile: result[0],
          medicalHistory: medicalResult,
          message: "",
        });
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
  let id = request.body.ohip_number;

  try {
    db.addPatient(request.body).then(() => {
      return response.redirect("/viewSearchPatient");
    });
  } catch (err) {
    console.error(err);
  }
});

router.put("/editPatient", (request, response) => {
  db.editPatient(request.body).then(() => {
    return response.status(200).send({ message: "Profile Updated" });
  });
});

router.get("/viewdoctors", (request, response) => {
  db.getDoctors().then((result) => {
    return response.render("viewDoctors.ejs", {
      title: "View Doctors",
      doctorProfile: result,
      message: "",
    });
  });
});

router.get("/viewAddDoctor", (request, response) => {
  return response.render("addDoctor.ejs", {
    title: "Add Doctor",
    message: "",
  });
});

router.post("/addDoctor", (request, response) => {
  db.addDoctors(request.body).then(() => {
    return response.redirect("/viewDoctors");
  });
});

router.get("/viewAddDiagnosis", (request, response) => {
  return response.render("diagnosis.ejs", {
    title: "Add Diagnosis",
    message: "",
  });
});

router.post("/AddDiagnosis", (request, response) => {
  try {
    db.addDiagnosis(request.body).then(() => {
      return response.redirect("/viewSearchPatient");
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/viewBills", (request, response) => {
  try {
    db.getBills().then((result) => {
      return response.render("viewBills.ejs", {
        title: "View Billings",
        billing: result,
        message: "",
      });
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/viewAddBill", (request, response) => {
  return response.render("addBills.ejs", {
    title: "Add Bill",
    message: "",
  });
});

router.post("/addBill", (request, response) => {
  try {
    db.addBills(request.body).then(() => {
      return response.redirect("/viewBills");
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/viewAppointment", (request, response) => {
  try{
    db.getAppointments().then((result) => {
      return response.render("viewAppointment.ejs", {
        title: "View appointments",
        appointments: result,
        message: "",
      });
    });
  }catch(err){
    console.error(err)
  }
});

router.get("/viewaddAppointment", (request, response) => {
  return response.render("addAppointment.ejs", {
    title: "Add Appointment",
    message: "",
  });
});

router.post("/addAppointment", (request, response) => {
  try{
    db.addAppointment(request.body).then(() => {
      return response.redirect("/viewAppointment");
    })
  }catch(err){
    console.error(err);
  }
});

export default router;
