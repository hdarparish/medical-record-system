import express, { request, response } from "express";
import db from "./db.js";

const router = express.Router();
//database connection

// get all the records
router.get("/", (request, response) => {
  let query = "SELECT * FROM `patients`"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      response.redirect("/");
    }
    return response.status(200).send({ result });
  });
});

//search by ID/OHIP number
router.post("/search", (request, response) => {
  let id = request.body.id;
  let query = `Select * from patients where ohip = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    if (result.length > 0) {
      return response.status(200).send({ result });
    }
    return response.status(401).send({ message: "incorrect OHIP" });
  });
});
//User login
router.post("/login", (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  try {
    let query = "Select * from users where username = ?";
    db.query(query, [username], (err, result) => {
      if (err) throw err;
      //check if there is a result from the query
      if (result.length > 0) {
        //check if the password matches the one entered
        if (password == result[0].password) {
          return response.status(200).send({ message: "Login successful" });
        }
      }
      return response.status(401).send({ message: "incorrect credentials" });
    });
  } catch (err) {
    console.error(err);
    // next(err);
  }
});

router.post("/addprofile", (request, response) => {
  let id = request.body.id;
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let birthDay = request.body.birthDay;
  let address = request.body.address;
  let gender = request.body.gender;
  let email = request.body.email;
  let phoneNumber = request.body.phoneNumber;

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

export default router;
