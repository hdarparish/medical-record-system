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
    //if (queryResult.length > 0) {
    return queryResult;
    // }
  } catch (err) {
    console.error(err);
  }
};

const getDoctors = async () => {
  try {
    const queryResult = await query(`Select * from doctors Order By last_name`);
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
      `Select * from doctors where doctor_id = '${doctorId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const editDoctor = async (reqBody) => {
  let doctorId = reqBody.doctorId;
  let firstName = reqBody.firstName;
  let lastName = reqBody.lastName;
  let specialization = reqBody.specialization;
  let department = reqBody.department;
  console.log(reqBody)
  await query(
    `UPDATE health_system.doctors SET first_name= '${firstName}', last_name= '${lastName}', specialization= '${specialization}', department= '${department}' where doctor_id = ${doctorId}`
  );
};

const deleteDoctor = async (doctorId) => {
  await query(`Delete from doctors where doctor_id = '${doctorId}'`);
};

const getPatients = async() => {
  try {
    const queryResult = await query(`Select * from patients`);
    return queryResult;
  } catch (err) {
    console.error(err);
  }
}

const searchPatient = async (patientId) => {
  try {
    const queryResult = await query(
      `Select * from patients where ohip = '${patientId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const addPatient = async (reqBody) => {
  let id = reqBody.ohip_number;
  let firstName = reqBody.first_name;
  let lastName = reqBody.last_name;
  let birthDay = reqBody.dateof_birth;
  let address = reqBody.address;
  let gender = reqBody.gender;
  let email = reqBody.email;
  let phoneNumber = reqBody.phone_number;

  await query(`INSERT INTO health_system.patients (ohip, first_name, last_name, phone_number, dateof_birth, email, gender, address)
   VALUES('${id}','${firstName}','${lastName}','${phoneNumber}', '${birthDay}','${email}','${gender}', '${address}')`);
};

const editPatient = async (reqBody) => {
  let id = reqBody.patientId;
  let firstName = reqBody.firstName;
  let lastName = reqBody.lastName;
  let birthDay = reqBody.birthDay;
  let address = reqBody.address;
  let gender = reqBody.gender;
  let email = reqBody.email;
  let phoneNumber = reqBody.phoneNumber;
  await query(
    `UPDATE health_system.patients SET first_name= '${firstName}', last_name= '${lastName}', phone_number= '${phoneNumber}', dateof_birth= '${birthDay}', email= '${email}', gender= '${gender}', address= '${address}' WHERE ohip= '${id}'`
  );

};

const deletePatient = async (patientId) => {
  await query(`Delete from patients where ohip = '${patientId}'`);
};

const patientHistory = async (patientId) => {
  try {
    const queryResult = await query(
      `Select * from medical_observation where ohip = '${patientId}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async () => {
  try {
    const queryResult = await query(
      `Select * from users`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
}

const searchUsers = async (username) => {
  try {
    const queryResult = await query(
      `Select * from users where username = '${username}'`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
}

const addUsers = async (reqBody) => {
  let userName = reqBody.userName;
  let email = reqBody.email;
  let password = reqBody.password;
  let isAdmin = reqBody.credential;
  try {
    const queryResult = await query(
      `Insert Into users Values ('${userName}', '${email}', '${password}', '${isAdmin}')`
    );
    return queryResult;
  } catch (err) {
    console.error(err);
  }
}

const editUsers = async (reqBody) => {
  let userName = reqBody.userName;
  let email = reqBody.email;
  let password = reqBody.password;
  let isAdmin = reqBody.credential;

  try{
    await query(
      `UPDATE users SET email = '${email}', password = '${password}', isAdmin = '${isAdmin}' where username = '${userName}'`
    );
  }
  catch(err){
    console.error(err);
  }
} 


const deleteUsers = async (username) => {
  try{
    await query(
      `Delete from users where username = '${username}'`
    );
  }catch(err){
    console.error(err);
  }
} 

const addDiagnosis = async (reqBody) => {
  let doctorId = reqBody.doctor_id;
  let patientId = reqBody.ohip;
  let diagnosis = reqBody.diagnosis;
  let labResult = reqBody.lab_result;
  let prescription = reqBody.prescription;
  await query(
    `Insert into medical_observation (doctor_id, ohip, observation_date, observation, laboratory, prescription) values ('${doctorId}', '${patientId}', localtime,'${diagnosis}','${labResult}','${prescription}')`
  );
};

const getBills = async () => {
  await query(
    `Select bill_number, patients.ohip, first_name, last_name, phone_number, email, billing.amount from patients, billing where patients.ohip = billing.ohip;`
  );
};

const addBills = async (reqBody) => {
  let patientId = reqBody.ohip_number;
  let amount = reqBody.amount;

  await query(
    `INSERT INTO billing (ohip,amount) values ('${patientId}', '${amount}' )`
  );
};

const editBill = async (reqBody) => {
  let receipt = reqBody.receipt_id;
  let patientId = reqBody.ohip_number;
  let amount = reqBody.amount;

  await query(
    `UPDATE billing SET amount= '${amount}', ohip = '${patientId}' where receipt_id = '${receipt}'`
  );
}
const deleteBill = async (receipt) => {
  await query(
    `Delete from billing where receipt_id = '${receipt}'`
  );
}

const getAppointments = async () => {
  let queryResult = query(`select appointment_time, appointment.ohip, patients.last_name as patient_lname, patients.first_name, doctors.doctor_id, doctors.last_name  from appointment, patients, doctors where appointment.ohip = patients.ohip and doctors.doctor_id = appointment.doctor_id
  `);
  return queryResult;
}

const addAppointment = async (reqBody) => {
  let patientId = reqBody.ohip_number;
  let appointmentTime = reqBody.appointment_time;
  let doctorId = reqBody.referred_doctor;

  await query(`INSERT INTO appointment (ohip,appointment_time,doctor_id) values ('${patientId}', '${appointmentTime}', '${doctorId}')`);
}

const editAppointment = async (reqBody) => {
  let appointmentId = reqBody.appointment_id;
  let patientId = reqBody.ohip_number;
  let appointmentTime = reqBody.appointment_time;
  let doctorId = reqBody.referred_doctor;
  await query(`Update appointment set ohip = '${patientId}', appointment_time = '${appointmentTime}' ,doctor_id = '${doctorId}' where appointment_id = '${appointmentId}'`);
}
const deleteAppointment = async (appointmentId) => {
  await query(`Delete from appointment where appointment_id = '${appointmentId}'`);
}
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
  deleteAppointment
};
