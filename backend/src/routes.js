import express, { request, response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import * as db from "./db.js";
import * as jwtoken from "jsonwebtoken";
import * as verifyJwt from "./verifyJwt.js";

dotenv.config();
const router = express.Router();

//User login
router.post("/login", async (request, response, next) => {
  let password = request.body.password;
  let userName = request.body.username;
  try {
    let searchResult = await db.userLogin(userName);
    if (searchResult.length > 0) {
      //check if the password entered matches the one in the DB
      let hashResult = await bcrypt.compare(password, searchResult[0].password);
      if (hashResult) {
        // request.session.userId = result[0].isAdmin;
        //check if the user is admin
        /*   if (searchResult[0].isAdmin) {
          //return response.status(200).redirect("/admin/mainpage");
          return response.status(200).send({ data: "Success" });
        } */
        const token = jwtoken.sign({ userName }, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        return response.status(200).send({ token });
        //if the user is not admin then redirect
        //return response.status(200).redirect("/mainpage");
      }
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

router.get(
  "/admin/viewPatients",
  verifyJwt.verifyToken,
  async (request, response) => {
    try {
      let result = await db.getPatients();
      if (result) {
        return response.status(200).send(result);
      }
    } catch (err) {
      return response
        .status(401)
        .send({ message: "incorrect credentials provided" });
    }
  }
);

//search by patient ID
router.post("/searchPatient", async (request, response) => {
  let id = request.body.patientId;
  try {
    let result = await db.searchPatient(id);
    if (result) {
      return response.status(200).send(result);
    } else {
      return response.status(404).send({ message: "Not found" });
    }
  } catch (err) {
    return response
      .status(401)
      .send({ message: "incorrect credentials provided" });
  }
});

// add new patient route
router.post("/addNewPatient", async (request, response) => {
  try {
    await db.addPatient(request.body);
    return response.status(201).send({ message: "Patient Added" });
  } catch (err) {
    console.error(err);
  }
});

//edit patient route
router.post("/editPatient", async (request, response) => {
  try {
    await db.editPatient(request.body);
    return response
      .status(200)
      .send({ message: "Patient Profile Update successful" });
  } catch (err) {
    console.error(err);
  }
});

//delete patient route
router.post("/deletePatient", async (request, response) => {
  let patientId = request.body.patientId;
  try {
    await db.deletePatient(patientId);
    return response.status(200).send({ message: "Patient Profile Deleted " });
  } catch (err) {
    console.error(err);
  }
});
//admin view all users
router.get("/admin/viewUsers", async (request, response) => {
  try {
    let result = db.getUsers();
    if (result) {
      return response.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
  }
});

//admin add new user
router.post("/admin/addUser", async (request, response) => {
  try {
    await db.addUsers(request.body);
    return response.status(201).send({ message: "User Created" });
  } catch (err) {
    console.error(err);
  }
});

//admin search user
router.post("/admin/searchUser", async (request, response) => {
  let username = request.body.username;
  try {
    let result = await db.searchUsers(username);
    if (result) {
      return response.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
  }
});

//admin edit user
router.post("/admin/editUsers", async (request, response) => {
  try {
    let result = await db.editUsers(request.body);
    if (result) {
      return response.status(200).send({ message: "User Updated" });
    }
  } catch (err) {
    console.error(err);
  }
});

//admin delete user
router.post("/admin/deleteUsers", async (request, response) => {
  let username = request.body.username;
  try {
    let result = await db.deleteUsers(username);
    if (result) {
      return response.status(200).send({ message: "User Deleted" });
    }
  } catch (err) {
    console.error(err);
  }
});

//admin view all doctors
router.get("/admin/viewDoctors", async (request, response) => {
  try {
    let result = await db.getDoctors();
    if (result) {
      return response.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
  }
});

//admin add new doctor
router.post("/admin/addDoctor", async (request, response) => {
  try {
    let result = await db.addDoctors(request.body);
    if (result) {
      return response.status(200).send({ message: "Doctor Added" });
    }
  } catch (err) {
    console.error(err);
  }
});

//search the doctor ID
router.get("/admin/searchDoctor/:id", async (request, response) => {
  let doctorId = request.params.id;
  try {
    let result = await db.searchDoctor(doctorId);
    if (result) {
      return response.status(200).send(result[0]);
    }
  } catch (err) {
    console.error(err);
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

//add diagnosis to patient
router.post("/AddDiagnosis", async (request, response) => {
  try {
    await db.addDiagnosis(request.body);
    return response.status(201).send({ message: "Diagnosis Added" });
  } catch (err) {
    console.error(err);
  }
});
//get the bills page
router.get("/viewBills", async (request, response) => {
  try {
    let result = await db.getBills();
    if (result) {
      return response.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
  }
});

//post the bill entered to database
router.post("/addBill", async (request, response) => {
  try {
    await db.addBills(request.body);
    return response.status(201).send({ message: "Bill Added" });
  } catch (err) {
    console.error(err);
  }
});
//get the appointments
router.get("/appointments", async (request, response) => {
  try {
    let result = await db.getAppointments();
    if (result) {
      return response.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
  }
});

//post the appointment to the database
router.post("/addAppointment", async (request, response) => {
  try {
    let result = await db.addAppointment(request.body);
    if (result) {
      return response.status(201).send({ appointment: "Created" });
    }
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
