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
          console.log(result[0]);
          if (result[0].isAdmin) {
            return response.status(200).redirect("/mainpageAdmin");
          }
          return response.status(200).redirect("/mainpage");
        }
      }
      return response.status(401).redirect("/");
    });
  } catch (err) {
    return response.status(401).redirect("/");
  }
});

router.get("/mainpageAdmin", (request, response) => {
  response.render("adminDash.ejs", {
    message: "",
    title: "Homepage",
    patient: "",
  });
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

router.get("/viewPatients", (request, response) => {
  db.getPatients().then((result) => {
    response.render("adminViewPatients.ejs", {
      message: "",
      patients: result,
      pageId: "welcome",
      title: "Welcome",
    });
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

router.get("/viewAddPatient", (request, response) => {
  response.render("adminAddPatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.get("/viewEditPatient", (request, response) => {
  response.render("adminEditPatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.post("/editPatient", (request, response) => {
  db.editPatient(request.body).then(() => {
    return response.status(200).redirect("/viewPatients");
  });
});

router.get("/viewDeletePatient", (request, response) => {
  response.render("adminDeletePatient.ejs", {
    message: "",
    patientProfile: "",
    pageId: "welcome",
    title: "Welcome",
  });
});

router.post("/deletePatient", (request, response) => {
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

router.get("/admin/viewUsers", (request, response) => {
  db.getUsers().then((result) => {
    return response.render("adminViewUsers.ejs", {
      users: result,
      title: "View Users",
      message: "",
    });
  });
});

router.get("/admin/addUsers", (request, response) => {
  return response.render("adminAddUsers.ejs", {
    title: "View Users",
    message: "",
  });
});

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

router.post("/admin/searchUser", (request,response) => {
  let username = request.body.username;
  db.searchUsers(username).then((result) => {
    //return response.render("adminEditUsers.ejs", {
      return response.render("adminDeleteUsers.ejs", {
      title: "View Users",
      users: result[0],
      message: "",
    });
  })
})

router.post("/admin/editExitstingUsers", (request, response) => {
  db.editUsers(request.body).then(() => {
    return response.status(200).redirect("/admin/viewUsers")
  })
});


router.get("/admin/viewDeleteUsers", (request, response) => {
  return response.render("adminDeleteUsers.ejs", {
    title: "Delete User",
    users: "",
    message: "",
  });
});
//change the params, something different then above
router.post("/admin/deleteUsers", (request, response) => {
  let username = request.body.username;
  db.deleteUsers(username).then(() => {
    return response.status(200).redirect("/admin/viewUsers")
  })
});

router.get("/admin/viewDoctors", (request, response) => {
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
router.get("/admin/addDoctor", (request, response) => {
  return response.render("adminAddDoctor.ejs", {
    title: "Add Doctor",
    message: "",
  });
});

//submit the add doctor form
router.post("/admin/addNewDoctor", (request, response) => {
  db.addDoctors(request.body).then(() => {
    return response.redirect("/admin/viewDoctors");
  });
});

//get the edit doctor page
router.get("/admin/editDoctor", (request,response) => {
  return response.render("adminEditDoctor.ejs", {
    title: "Edit Doctor",
    doctor: "",
    message: "",
  });
})
//submit the doctor ID to fill out the doctor profile
router.post("/admin/searchDoctor", (request,response) => {
  let doctorId = request.body.doctorId;
  db.searchDoctor(doctorId).then((result) => {
   // return response.render("adminEditDoctor.ejs", { This is used by 2 different pages, figure out a way to implement
   return response.render("adminDeleteDoctor.ejs", {
      title: "Remove Doctor",
      doctor: result[0],
      message: "",
    });
  })
})

router.post("/admin/editExistingDoctor", (request,response) => {
  db.editDoctor(request.body).then(() => {
    return response.redirect("/admin/viewDoctors");
  });
})

router.get("/admin/viewDeleteDoctor", (request,response) => {
  return response.render("adminDeleteDoctor.ejs", {
    title: "Remove Doctor",
    doctor: "",
    message: "",
  });
})

router.post("/admin/deleteDoctor", (request,response) => {
  let doctorId = request.body.doctorId;
  db.deleteDoctor(doctorId).then(() => {
    return response.redirect("/admin/viewDoctors");
  })
})

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

router.get("/viewaddAppointment", (request, response) => {
  return response.render("addAppointment.ejs", {
    title: "Add Appointment",
    message: "",
  });
});

router.post("/addAppointment", (request, response) => {
  try {
    db.addAppointment(request.body).then(() => {
      return response.redirect("/viewAppointment");
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/logout", (request, response) => {
  return response.status(201).redirect("/");
});

export default router;
