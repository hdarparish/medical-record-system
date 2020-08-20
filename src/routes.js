import express, { request, response } from "express";
import db from "./db.js";

const router = express.Router();
//database connection

// get all the records
/*router.get("/", (request, response) => {
  let query = "SELECT * FROM `patients`"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      response.redirect("/");
    }
    return response.status(200).send({ result });
  });
});
*/

router.get("/", (request, response) => {
  let message = "";
  response.render("login.ejs", {
    message: message,
    pageId: "welcome",
    title: "Welcome",
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

//search by ID/OHIP number
router.post("/search", (request, response) => {
  let id = request.body.id;
  console.log(id);
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
    }
    return response.status(401).send({ message: "incorrect OHIP" });
  });
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

router.get("/viewBillingAccounts", (request, response) => {
  let query = `select patients.ohip, first_name, last_name, phone_number, email, billing.amount from patients, billing where patients.ohip = billing.ohip;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    return response.render("billingAccounts.ejs", {
      title: "View Billings",
      billing: result,
      message: "",
    });
  });
});
router.get("/addBill", (request, response) => {
  return response.render("addBills.ejs", {
    title: "Add Bill",
    message: "",
  });
});

export default router;
