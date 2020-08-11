import express, { request, response } from "express";
import mysql from "mysql";

const router = express.Router();
//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "health_System",
});

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
router.post("/id", (request, response) => {
  let id = request.body.id;
  let query = `Select * from patients where ohip = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      response.redirect("/");
    }
    return response.status(200).send({ result });
  });
});
export default router;
