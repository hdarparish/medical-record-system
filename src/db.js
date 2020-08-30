import mysql from "mysql";
import util from "util";

const db = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "health_System",
});

const query = util.promisify(db.query).bind(db);

// open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const userLogin = async (reqBody) => {
  let username = reqBody.username;

  try {
    const queryResult = await query(
      `Select * from users where username = '${username}'`
    );
    //check if there is a result from the query
    if (queryResult.length > 0) {
      return queryResult;
    }
  } catch (err) {
    console.error(err);
  }
};

const viewList = async (tableName) => {
  const queryResult = await query(`Select * from ${tableName}`);
  return queryResult;
};

export { userLogin, viewList };
