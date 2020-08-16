import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "health_System",
});

// open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;
