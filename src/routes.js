import express, { request, response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import * as db from "./db.js";
import * as verifySession from "./verifySession";

dotenv.config();
const router = express.Router();

router.get("/", (request, response) => {
  response.render("login.ejs", {
    message: "",
    pageId: "Login",
    title: "Login",
  });
});

//User login
router.post("/login", async (request, response, next) => {
  let password = request.body.password;
  try {
    db.userLogin(request.body).then((result) => {
      if (result.length > 0) {
        //check if the password entered matches the one in the DB
        bcrypt.compare(password, result[0].password).then((hashResult) => {
          if (hashResult) {
            request.session.userId = result[0].isAdmin;
            //check if the user is admin
            if (result[0].isAdmin) {
              return response.status(200).redirect("/admin/mainpage");
            }
            //if the user is not admin then redirect
            return response.status(200).redirect("/mainpage");
          }
          //if the password is wrong but the account exists
          return response.status(401).redirect("/");
        });
      }
    });
  } catch (err) {
    return response.status(401).redirect("/");
  }
});
//Get the Admin page
router.get(
  "/admin/mainpage",
  verifySession.admin,
  (request, response, next) => {
    response.render("adminDash.ejs", {
      message: "",
      title: "Homepage",
      patient: "",
    });
  }
);
//get the regular page
router.get("/mainpage", verifySession.user, (request, response) => {
  response.render("mainpage.ejs", {
    message: "",
    title: "Homepage",
  });
});

router.get("/patient", verifySession.user, (request, response) => {
  response.render("patient.ejs", {
    message: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.get("/viewPatients", verifySession.admin, (request, response) => {
  db.getPatients().then((result) => {
    response.render("adminViewPatients.ejs", {
      message: "",
      patients: result,
      pageId: "welcome",
      title: "Welcome",
    });
  });
});

router.get("/viewSearchPatient", verifySession.user, (request, response) => {
  return response.render("searchPatient.ejs", {
    title: "Search Patient",
    message: "",
  });
});

//search by ID/OHIP number
router.post("/searchPatient", verifySession.user, (request, response) => {
  let id = request.body.patientId;
  db.searchPatient(id).then((result) => {
    if (result.length > 0) {
      console.log(result[0]);
      //return response.render("adminEditPatient.ejs", {
      return response.render("adminDeletePatient.ejs", {
        title: "View Patient",
        patientProfile: result[0],
        message: "",
      });
      /*The code below should be executed in the care provider dash
      db.searchPatientHistory(id).then((medicalResult) => {
        return response.render("patientDash1.ejs", {
          title: "View Patient",
          patientProfile: result[0],
          medicalHistory: medicalResult,
          message: "",
        });
      });
      */
    } else {
      return response.render("addPatient.ejs", {
        title: "Add Patient",
        health_number: id,
        message: "",
      });
    }
  });
});

router.post("/addNewPatient", verifySession.user, (request, response) => {
  let id = request.body.ohip_number;

  try {
    db.addPatient(request.body).then(() => {
      return response.redirect("/viewSearchPatient");
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/viewAddPatient", verifySession.admin, (request, response) => {
  response.render("adminAddPatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.get("/viewEditPatient", verifySession.admin, (request, response) => {
  response.render("adminEditPatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.post("/editPatient", verifySession.admin, (request, response) => {
  db.editPatient(request.body).then(() => {
    return response.status(200).redirect("/viewPatients");
  });
});

router.get("/viewDeletePatient", verifySession.admin, (request, response) => {
  response.render("adminDeletePatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.post("/deletePatient", verifySession.admin, (request, response) => {
  let patientId = request.body.patientId;
  db.deletePatient(patientId).then(() => {
    //return response.status(200).send({ message: "Profile Updated" });
    return response.status(200).redirect("/viewPatients");
  });
});

router.get("/viewdoctors", (request, response) => {
  db.getDoctors().then((result) => {
    //check if admin and route to page
    //return response.render("viewDoctors.ejs", {
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

router.get("/admin/viewUsers", verifySession.admin, (request, response) => {
  db.getUsers().then((result) => {
    return response.render("adminViewUsers.ejs", {
      users: result,
      title: "View Users",
      message: "",
    });
  });
});

router.get("/admin/addUsers", verifySession.admin, (request, response) => {
  return response.render("adminAddUsers.ejs", {
    title: "View Users",
    message: "",
  });
});

router.post("/admin/addNewUser", verifySession.admin, (request, response) => {
  try {
    db.addUsers(request.body).then(() => {
      return response.redirect("/admin/viewUsers");
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/admin/editUsers", verifySession.admin, (request, response) => {
  return response.render("adminEditUsers.ejs", {
    title: "View Users",
    users: "",
    message: "",
  });
});

router.post("/admin/searchUser", verifySession.admin, (request, response) => {
  let username = request.body.username;
  db.searchUsers(username).then((result) => {
    //return response.render("adminEditUsers.ejs", {
    return response.render("adminDeleteUsers.ejs", {
      title: "View Users",
      users: result[0],
      message: "",
    });
  });
});

router.post(
  "/admin/editExitstingUsers",
  verifySession.admin,
  (request, response) => {
    db.editUsers(request.body).then(() => {
      return response.status(200).redirect("/admin/viewUsers");
    });
  }
);

router.get(
  "/admin/viewDeleteUsers",
  verifySession.admin,
  (request, response) => {
    return response.render("adminDeleteUsers.ejs", {
      title: "Delete User",
      users: "",
      message: "",
    });
  }
);
//change the params, something different then above
router.post("/admin/deleteUsers", verifySession.admin, (request, response) => {
  let username = request.body.username;
  db.deleteUsers(username).then(() => {
    return response.status(200).redirect("/admin/viewUsers");
  });
});

router.get("/admin/viewDoctors", verifySession.admin, (request, response) => {
  db.getDoctors().then((result) => {
    //check if admin and route to page
    //return response.render("viewDoctors.ejs", {
    return response.render("adminViewDoctors.ejs", {
      title: "View Doctors",
      doctors: result,
      message: "",
    });
  });
});

//The add doctor page
router.get("/admin/addDoctor", verifySession.admin, (request, response) => {
  return response.render("adminAddDoctor.ejs", {
    title: "Add Doctor",
    message: "",
  });
});

//submit the add doctor form
router.post("/admin/addNewDoctor", verifySession.admin, (request, response) => {
  db.addDoctors(request.body).then(() => {
    return response.redirect("/admin/viewDoctors");
  });
});

//get the edit doctor page
router.get("/admin/editDoctor", verifySession.admin, (request, response) => {
  return response.render("adminEditDoctor.ejs", {
    title: "Edit Doctor",
    doctor: "",
    message: "",
  });
});
//submit the doctor ID to fill out the doctor profile
router.post("/admin/searchDoctor", verifySession.admin, (request, response) => {
  let doctorId = request.body.doctorId;
  db.searchDoctor(doctorId).then((result) => {
    // return response.render("adminEditDoctor.ejs", { This is used by 2 different pages, figure out a way to implement
    return response.render("adminDeleteDoctor.ejs", {
      title: "Remove Doctor",
      doctor: result[0],
      message: "",
    });
  });
});

router.post(
  "/admin/editExistingDoctor",
  verifySession.admin,
  (request, response) => {
    db.editDoctor(request.body).then(() => {
      return response.redirect("/admin/viewDoctors");
    });
  }
);

router.get(
  "/admin/viewDeleteDoctor",
  verifySession.admin,
  (request, response) => {
    return response.render("adminDeleteDoctor.ejs", {
      title: "Remove Doctor",
      doctor: "",
      message: "",
    });
  }
);

router.post("/admin/deleteDoctor", verifySession.admin, (request, response) => {
  let doctorId = request.body.doctorId;
  db.deleteDoctor(doctorId).then(() => {
    return response.redirect("/admin/viewDoctors");
  });
});

//Regular user routes
//get diagnosis page
router.get("/viewAddDiagnosis", verifySession.user, (request, response) => {
  return response.render("diagnosis.ejs", {
    title: "Add Diagnosis",
    message: "",
  });
});
//add diagnosis to patient
router.post("/AddDiagnosis", verifySession.user, (request, response) => {
  try {
    db.addDiagnosis(request.body).then(() => {
      return response.redirect("/viewSearchPatient");
    });
  } catch (err) {
    console.error(err);
  }
});
//get the bills page
router.get("/viewBills", verifySession.user, (request, response) => {
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
//get the add bill page
router.get("/viewAddBill", verifySession.user, (request, response) => {
  return response.render("addBills.ejs", {
    title: "Add Bill",
    message: "",
  });
});
//post the bill entered to database
router.post("/addBill", verifySession.user, (request, response) => {
  try {
    db.addBills(request.body).then(() => {
      return response.redirect("/viewBills");
    });
  } catch (err) {
    console.error(err);
  }
});
//get the appointments page
router.get("/viewAppointment", verifySession.user, (request, response) => {
  try {
    db.getAppointments().then((result) => {
      return response.render("viewAppointment.ejs", {
        title: "View appointments",
        appointments: result,
        message: "",
      });
    });
  } catch (err) {
    console.error(err);
  }
});
//get the add appointment page
router.get("/viewaddAppointment", verifySession.user, (request, response) => {
  return response.render("addAppointment.ejs", {
    title: "Add Appointment",
    message: "",
  });
});
//post the appointment to the database
router.post("/addAppointment", verifySession.user, (request, response) => {
  try {
    db.addAppointment(request.body).then(() => {
      return response.redirect("/viewAppointment");
    });
  } catch (err) {
    console.error(err);
  }
});
//terminate session and redirect to login
router.get("/logout", (request, response) => {
  request.session.destroy();
  return response.status(201).redirect("/");
});

export default router;
