# Medical Record Management System
### Project Setup
`npm install`to install all the dependencies

To start the project 

For development mode enter `npm run dev` 

For regular mode `npm start` 

### Database Setup
Enter the below in DBeaver
```
REATE DATABASE healthSystem
USE healthSystem 

CREATE TABLE IF NOT EXISTS patients (
	patientId int(9) NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	phoneNumber varchar(20) NOT NULL,
	birthDay date NOT NULL,
	email varchar(255),
	gender varchar(20) NOT NULL,
	address varchar(255) not null,
	isActive bool default 1,
	PRIMARY KEY (patientId)
)

CREATE TABLE IF NOT EXISTS users (
	userName varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	isAdmin bool NOT NULL,
	PRIMARY KEY (userName)
)

CREATE TABLE IF NOT EXISTS doctors (
	doctorId int(5) NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	specialization varchar(255) not null,
	department varchar (255) not null,
	PRIMARY KEY (doctorId)
)

CREATE TABLE IF NOT EXISTS billing (
	billNumber int(5) NOT NULL AUTO_INCREMENT,
	patientId int(9) NOT null,
	amount double not null,
	PRIMARY KEY (billNumber),
	foreign key (patientId) references patients (patientId)
)

 CREATE TABLE IF NOT EXISTS appointment (
	appointmentId int(5) NOT NULL AUTO_INCREMENT, 
	patientId int(9) NOT null,
	appointmentTime datetime not null,
	doctorId int(5) not null,
	PRIMARY KEY (appointmentId),
	foreign key (patientId) references patients (patientId),
	foreign key (doctorId) references doctors (doctorId)
)

CREATE TABLE IF NOT EXISTS medicalObservation (
	observationId int(9)NOT NULL auto_increment,
	doctorId int(5) not null,
	patientId int(9) NOT null,
	observationDate datetime not null,
	diagnosis varchar(255),
	labResult varchar(255),
	prescription varchar(255),
	PRIMARY KEY (observationId),
	foreign key (patientId) references patients (patientId),
	foreign key (doctorId) references doctors (doctorId)
)
```

### Populate Database

```
insert into patients values (123456789, 'Jack','Daniel','4160001231','2000-01-01','jd@email.com','Male','212 Streat Boulivard',1);
insert into patients values (111654987, 'Thanos','n/a','4161111111','1960-06-06','Thanos@email.com','Male','6 infitiy stones street',1);
insert into patients values (456125489, 'John','Constantine','4164453554','1970-07-30','Constantine@email.com','Male','670 Avenue West',1);

insert into users values ('johndoe', 'jdoe@email.com','password',1);
insert into users values ('janedoe', 'janedoe@email.com','password',1);

insert into doctors values (10000,'Mike', 'Johns', 'GP','ER')
insert into doctors values (10010,'George', 'Jones', 'Infectious Diseases','Infectious Diseases')
insert into doctors values (10020,'Ann', 'Dorathy', 'General','Medicine')

insert into billing values (123456789, 45);
insert into billing values (456125489, 99);
```


