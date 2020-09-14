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
    /*
    db.userLogin(request.body).then((result) => {
      if (result.length > 0) {
        //check if the password entered matches the one in the DB
        bcrypt.compare(password, result[0].password).then((hashResult) => {
          if (hashResult) {
            request.session.userId = result[0].isAdmin;
            //check if the user is admin
            if (result[0].isAdmin) {
              //return response.status(200).redirect("/admin/mainpage");
              return response.status(200).send({ data: "Success" });
            }
            //if the user is not admin then redirect
            return response.status(200).redirect("/mainpage");
          }
          //if the password is wrong but the account exists
          return response.status(401).redirect("/");
        });

      } else {
        return response.status(401).redirect("/");
      }
    });*/
    let searchResult = await db.userLogin(request.body);
    if (searchResult.length > 0) {
      //check if the password entered matches the one in the DB
      let hashResult = await bcrypt.compare(password, searchResult[0].password);
      if (hashResult) {
        // request.session.userId = result[0].isAdmin;
        //check if the user is admin
        if (searchResult[0].isAdmin) {
          //return response.status(200).redirect("/admin/mainpage");
          return response.status(200).send({ data: "Success" });
        }
        //if the user is not admin then redirect
        return response.status(200).redirect("/mainpage");
      }
      //if the password is wrong but the account exists
      return response
        .status(401)
        .send({ message: "incorrect credentials provided" });
    } else {
      return response
        .status(401)
        .send({ message: "incorrect credentials provided" });
    }
  } catch (err) {
    return response
      .status(401)
      .send({ message: "incorrect credentials provided" });
  }
});
//Get the Admin page
/*
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
);*/
//get the regular page
/*
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
});*/

router.get("/admin/viewPatients", async (request, response) => {
  /* db.getPatients().then((result) => {

    response.render("adminViewPatients.ejs", {
      message: "",
      patients: result,
      pageId: "welcome",
      title: "Welcome",
    });
  });*/
  let result = await db.getPatients();
  if (result) {
    return response.status(200).send(result);
  }
});
/*
router.get("/viewSearchPatient", verifySession.user, (request, response) => {
  return response.render("searchPatient.ejs", {
    title: "Search Patient",
    message: "",
  });
});*/

//search by patient ID
router.post("/searchPatient", verifySession.user, (request, response) => {
  let id = request.body.patientId;
  db.searchPatient(id).then((result) => {
    if (result.length > 0) {
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
/*
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
});*/

router.post("/editPatient", verifySession.admin, (request, response) => {
  db.editPatient(request.body).then(() => {
    return response.status(200).redirect("/viewPatients");
  });
});
/*
router.get("/viewDeletePatient", verifySession.admin, (request, response) => {
  response.render("adminDeletePatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});*/

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
/*
router.get("/viewAddDoctor", (request, response) => {
  return response.render("addDoctor.ejs", {
    title: "Add Doctor",
    message: "",
  });
});
*/
router.get("/admin/viewUsers", (request, response) => {
  db.getUsers().then((result) => {
    /*return response.render("adminViewUsers.ejs", {
        users: result,
        title: "View Users",
        message: "",
       });*/
    return response.status(200).send(result);
  });
});
/*
router.get("/admin/addUsers", (request, response) => {
  return response.render("adminAddUsers.ejs", {
    title: "View Users",
    message: "",
  });
});
*/
router.post("/admin/addNewUser", (request, response) => {
  try {
    db.addUsers(request.body).then(() => {
      return response.redirect("/admin/viewUsers");
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/admin/editUsers", (request, response) => {
  return response.render("adminEditUsers.ejs", {
    title: "View Users",
    users: "",
    message: "",
  });
});

router.post("/admin/searchUser", (request, response) => {
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
/*
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
);*/
//change the params, something different then above
router.post("/admin/deleteUsers", verifySession.admin, (request, response) => {
  let username = request.body.username;
  db.deleteUsers(username).then(() => {
    return response.status(200).redirect("/admin/viewUsers");
  });
});

router.get("/admin/viewDoctors", async (request, response) => {
  let result = await db.getDoctors();
  if (result) {
    return response.status(200).send(result);
  }
});
/*
//The add doctor page
router.get("/admin/addDoctor", verifySession.admin, (request, response) => {
  return response.render("adminAddDoctor.ejs", {
    title: "Add Doctor",
    message: "",
  });
});*/

//submit the add doctor form
router.post("/admin/addNewDoctor", verifySession.admin, (request, response) => {
  db.addDoctors(request.body).then(() => {
    return response.redirect("/admin/viewDoctors");
  });
});
/*
//get the edit doctor page
router.get("/admin/editDoctor", verifySession.admin, (request, response) => {
  return response.render("adminEditDoctor.ejs", {
    title: "Edit Doctor",
    doctor: "",
    message: "",
  });
});*/
//search the doctor ID
router.get("/admin/searchDoctor/:id", async (request, response) => {
  let doctorId = request.params.id;
  let result = await db.searchDoctor(doctorId);
  if (result) {
    return response.status(200).send(result[0]);
  }
});

router.put("/admin/editDoctor", async (request, response) => {
  try {
    let result = await db.editDoctor(request.body);
    if (result) {
      return response.status(200).send({ success: result });
    }
  } catch (err) {
    return response.status(400).send({ message: err });
  }
});
/*
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
);*/

router.get("/admin/deleteDoctor/:id", async (request, response) => {
  let doctorId = request.params.id;
  try {
    let result = await db.deleteDoctor(doctorId);
    if (result) {
      return response.status(200).send({ success: result });
    }
  } catch (err) {
    return response.status(400).send({ message: err });
  }
});

//Regular user routes
//get diagnosis page
/*
router.get("/viewAddDiagnosis", verifySession.user, (request, response) => {
  return response.render("diagnosis.ejs", {
    title: "Add Diagnosis",
    message: "",
  });
});*/
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
/*
router.get("/viewAddBill", verifySession.user, (request, response) => {
  return response.render("addBills.ejs", {
    title: "Add Bill",
    message: "",
  });
});*/
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
/*
//get the add appointment page
router.get("/viewaddAppointment", verifySession.user, (request, response) => {
  return response.render("addAppointment.ejs", {
    title: "Add Appointment",
    message: "",
  });
});
*/
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
