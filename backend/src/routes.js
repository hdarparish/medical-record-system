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
          expiresIn: "60m",
        });
        return response.status(200).send({ token });
        //if the user is not admin then redirect
        //return response.status(200).redirect("/mainpage");
      }
    }
    return response
      .status(401)
      .send({ message: "incorrect credentials provided" });
  } catch (err) {
    return response
      .status(401)
      .send({ message: "incorrect credentials provided" });
  }
});

router.get("/patients", verifyJwt.verifyToken, async (request, response) => {
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
});

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
router.post("/patient", verifyJwt.verifyToken, async (request, response) => {
  try {
    await db.addPatient(request.body.patient);
    return response.status(201).send({ message: "Patient Added" });
  } catch (err) {
    console.error(err);
  }
});

//edit patient route
router.put("/patient", async (request, response) => {
  try {
    await db.editPatient(request.body.patient);
    return response
      .status(200)
      .send({ message: "Patient Profile Update successful" });
  } catch (err) {
    console.error(err);
  }
});

//delete patient route
router.delete(
  "/patient/:id",
  verifyJwt.verifyToken,
  async (request, response) => {
    let patientId = request.params.id;
    try {
      await db.deletePatient(patientId);
      return response.status(200).send({ message: "Patient Profile Deleted " });
    } catch (err) {
      console.error(err);
    }
  }
);
// view all users
router.get("/users", verifyJwt.verifyToken, async (request, response) => {
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
router.post("/user", verifyJwt.verifyToken, async (request, response) => {
  try {
    await db.addUsers(request.body);
    return response.status(201).send({ message: "User Created" });
  } catch (err) {
    console.error(err);
  }
});

/* //admin search user
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
}); */

//admin edit user
router.put("/user", verifyJwt.verifyToken, async (request, response) => {
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
router.delete("/user", verifyJwt.verifyToken, async (request, response) => {
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
router.get("/doctors", verifyJwt.verifyToken, async (request, response) => {
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
router.post("/doctor", async (request, response) => {
  console.log(request.body);
  try {
    let result = await db.addDoctors(request.body.doctor);
    if (result) {
      return response.status(200).send({ message: "Doctor Added" });
    }
  } catch (err) {
    console.error(err);
  }
});

//edit doctor
router.put("/doctor", verifyJwt.verifyToken, async (request, response) => {
  try {
    let result = await db.editDoctor(request.body.doctor);
    if (result) {
      return response.status(200).send({ success: result });
    }
  } catch (err) {
    return response.status(400).send({ message: err });
  }
});

router.delete(
  "/doctor/:id",
  verifyJwt.verifyToken,
  async (request, response) => {
    let doctorId = request.params.id;
    try {
      let result = await db.deleteDoctor(doctorId);
      if (result) {
        return response.status(200).send({ success: result });
      }
    } catch (err) {
      return response.status(400).send({ message: err });
    }
  }
);

//add diagnosis to patient
router.post("/diagnosis", verifyJwt.verifyToken, async (request, response) => {
  try {
    await db.addDiagnosis(request.body);
    return response.status(201).send({ message: "Diagnosis Added" });
  } catch (err) {
    console.error(err);
  }
});
//get all bills
router.get("/bills", verifyJwt.verifyToken, async (request, response) => {
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
router.post("/bill", verifyJwt.verifyToken, async (request, response) => {
  try {
    await db.addBills(request.body.data);
    return response.status(201).send({ message: "Bill Added" });
  } catch (err) {
    console.error(err);
  }
});
//delete patient route
router.delete("/bill/:id", verifyJwt.verifyToken, async (request, response) => {
  let billId = request.params.id;
  try {
    console.log(billId);
    await db.deleteBill(billId);
    return response.status(200).send({ message: "Bill deleted " });
  } catch (err) {
    console.error(err);
  }
});
//get the appointments
router.get(
  "/appointments",
  verifyJwt.verifyToken,
  async (request, response) => {
    try {
      let result = await db.getAppointments();
      if (result) {
        return response.status(200).send(result);
      }
    } catch (err) {
      console.error(err);
    }
  }
);

//post the appointment to the database
router.post(
  "/appointment",
  verifyJwt.verifyToken,
  async (request, response) => {
    try {
      let result = await db.addAppointment(request.body.data);
      if (result) {
        return response.status(201).send({ appointment: "Created" });
      }
    } catch (err) {
      console.error(err);
    }
  }
);

export default router;
