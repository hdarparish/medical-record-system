import mysql from "mysql";
import util from "util";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

const query = util.promisify(db.query).bind(db);

// open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const userLogin = async (userName) => {
  try {
    const queryResult = await query(
      `Select * from users where userName = '${userName}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const getDoctors = async () => {
  try {
    const queryResult = await query(`Select * from doctors Order By lastName`);
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addDoctors = async (reqBody) => {
  try {
    let id = reqBody.doctorId;
    let firstName = reqBody.firstName;
    let lastName = reqBody.lastName;
    let specialization = reqBody.specialization;
    let department = reqBody.department;

    await query(
      `INSERT INTO doctors VALUES (${id},'${firstName}','${lastName}', '${specialization}', '${department}')`
    );
  } catch (err) {
    console.error(err);
  }
};

const searchDoctor = async (doctorId) => {
  try {
    const queryResult = await query(
      `Select * from doctors where doctorId = '${doctorId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const editDoctor = async (reqBody) => {
  try {
    let doctorId = reqBody.doctorId;
    let firstName = reqBody.firstName;
    let lastName = reqBody.lastName;
    let specialization = reqBody.specialization;
    let department = reqBody.department;
    const queryResult = await query(
      `UPDATE doctors SET firstName= '${firstName}', lastName= '${lastName}', specialization= '${specialization}', department= '${department}' where doctorId = ${doctorId}`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const deleteDoctor = async (doctorId) => {
  try {
    await query(`Delete from doctors where doctorId = '${doctorId}'`);
  } catch (err) {
    console.error(err);
  }
};

const getPatients = async () => {
  try {
    const queryResult = await query(`Select * from patients`);
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const searchPatient = async (patientId) => {
  try {
    const queryResult = await query(
      `Select * from patients where patientId = '${patientId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addPatient = async (reqBody) => {
  try {
    let id = reqBody.patientId;
    let firstName = reqBody.firstName;
    let lastName = reqBody.lastName;
    let birthDay = reqBody.birthDay;
    let address = reqBody.address;
    let gender = reqBody.gender;
    let email = reqBody.email;
    let phoneNumber = reqBody.phoneNumber;

    await query(`INSERT INTO patients (patientId, firstName, lastName, phoneNumber, birthDay, email, gender, address)
     VALUES('${id}','${firstName}','${lastName}','${phoneNumber}', '${birthDay}','${email}','${gender}', '${address}')`);
  } catch (err) {
    console.error(err);
  }
};

const editPatient = async (reqBody) => {
  try {
    let id = reqBody.patientId;
    let firstName = reqBody.firstName;
    let lastName = reqBody.lastName;
    let birthDay = reqBody.birthDay;
    let address = reqBody.address;
    let gender = reqBody.gender;
    let email = reqBody.email;
    let phoneNumber = reqBody.phoneNumber;
    await query(
      `UPDATE patients SET firstName= '${firstName}', lastName= '${lastName}', phoneNumber= '${phoneNumber}', birthDay= '${birthDay}', email= '${email}', gender= '${gender}', address= '${address}' WHERE patientId= '${id}'`
    );
  } catch (err) {
    console.error(err);
  }
};

const deletePatient = async (patientId) => {
  try {
    await query(`Delete from patients where patientId = '${patientId}'`);
  } catch (err) {
    console.error(err);
  }
};

const patientHistory = async (patientId) => {
  try {
    const queryResult = await query(
      `Select * from medical_observation where patientId = '${patientId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async () => {
  try {
    const queryResult = await query(
      `Select username, email, isAdmin from users`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const searchUsers = async (username) => {
  try {
    const queryResult = await query(
      `Select * from users where username = '${username}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addUsers = async (reqBody) => {
  let userName = reqBody.username;
  let email = reqBody.email;
  let password = reqBody.password;
  let isAdmin = reqBody.credential;
  let saltRounds = Number(process.env.BCRYPT_ROUNDS);
  try {
    let passwordHash = await bcrypt.hash(password, saltRounds);
    await query(
      `Insert Into users Values ('${userName}', '${email}', '${passwordHash}', '${isAdmin}')`
    );
  } catch (err) {
    console.error(err);
  }
};

const editUsers = async (reqBody) => {
  let userName = reqBody.username;
  let email = reqBody.email;
  let password = reqBody.password;
  let isAdmin = reqBody.credential;

  try {
    await query(
      `UPDATE users SET email = '${email}', password = '${password}', isAdmin = '${isAdmin}' where userName = '${userName}'`
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteUsers = async (username) => {
  try {
    await query(`Delete from users where userName = '${username}'`);
  } catch (err) {
    console.error(err);
  }
};

const addDiagnosis = async (reqBody) => {
  try {
    let doctorId = reqBody.doctor_id;
    let patientId = reqBody.patientId;
    let diagnosis = reqBody.diagnosis;
    let labResult = reqBody.lab_result;
    let prescription = reqBody.prescription;
    await query(
      `Insert into medicalObservation (doctorId, patientId, observationDate, diagnosis, labResult, prescription) values ('${doctorId}', '${patientId}', localtime,'${diagnosis}','${labResult}','${prescription}')`
    );
  } catch (err) {
    console.error(err);
  }
};

const getBills = async () => {
  try {
    let queryResult = await query(
      `Select billNumber, patients.patientId, firstName, lastName, phoneNumber, email, billing.amount from patients, billing where patients.patientId = billing.patientId;`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addBills = async (reqBody) => {
  try {
    let patientId = reqBody.patientId;
    let amount = reqBody.amount;
    await query(
      `INSERT INTO billing (patientId,amount) values ('${patientId}', '${amount}' )`
    );
  } catch (err) {
    console.error(err);
  }
};

const editBill = async (reqBody) => {
  try {
    let receipt = reqBody.receipt_id;
    let patientId = reqBody.patientId;
    let amount = reqBody.amount;
    await query(
      `UPDATE billing SET amount= '${amount}', patientId = '${patientId}' where receiptId = '${receipt}'`
    );
  } catch (err) {
    console.error(err);
  }
};
const deleteBill = async (receipt) => {
  try {
    await query(`Delete from billing where receiptId = '${receipt}'`);
  } catch (err) {
    console.error(err);
  }
};

const getAppointments = async () => {
  try {
    let queryResult =
      //query(`select appointmentTime, appointment.patientId, patients.lastName as patient_lname, patients.firstName, doctors.doctorId, doctors.lastName  from appointment, patients, doctors where appointment.patientId = patients.patientId and doctors.doctorId = appointment.doctorId
      query(`select appointmentId as id, appointmentTime as startDate, CONCAT(patients.lastName, ', ', patients.firstName) AS title from appointment, patients where appointment.patientId = patients.patientId
    `);
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addAppointment = async (reqBody) => {
  try {
    let patientId = reqBody.patientId;
    let appointmentTime = reqBody.appointmentTime;
    let doctorId = reqBody.doctorId;
    await query(
      `INSERT INTO appointment (patientId,appointmentTime,doctorId) values ('${patientId}', '${appointmentTime}', '${doctorId}')`
    );
  } catch (err) {
    console.error(err);
  }
};

const editAppointment = async (reqBody) => {
  try {
    let appointmentId = reqBody.appointment_id;
    let patientId = reqBody.patientId;
    let appointmentTime = reqBody.appointment_time;
    let doctorId = reqBody.referred_doctor;
    await query(
      `Update appointment set patientId = '${patientId}', appointmentTime = '${appointmentTime}' ,doctorId = '${doctorId}' where appointmentId = '${appointmentId}'`
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    await query(
      `Delete from appointment where appointmentId = '${appointmentId}'`
    );
  } catch (err) {
    console.error(err);
  }
};
export {
  userLogin,
  getDoctors,
  addDoctors,
  searchDoctor,
  editDoctor,
  deleteDoctor,
  getPatients,
  searchPatient,
  patientHistory,
  addPatient,
  editPatient,
  deletePatient,
  getUsers,
  searchUsers,
  addUsers,
  editUsers,
  deleteUsers,
  addDiagnosis,
  getBills,
  addBills,
  editBill,
  deleteBill,
  getAppointments,
  addAppointment,
  editAppointment,
  deleteAppointment,
};
