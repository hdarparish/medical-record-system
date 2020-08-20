# Medical Record Management System
### Project Setup
`npm install`to install all the dependencies

To start the project 

For development mode enter `npm run dev` 

For regular mode `npm start` 

### Database Setup
Enter the below in DBeaver
```
CREATE DATABASE health_System
USE health_system 

CREATE TABLE IF NOT EXISTS patients (
  ohip int(9) NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  phone_number varchar(20) NOT NULL,
  dateof_birth date NOT NULL,
  email varchar(255),
  gender varchar(20) NOT NULL,
  address varchar(255) not null,
  PRIMARY KEY (ohip)
)

CREATE TABLE IF NOT EXISTS users (
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(20) NOT NULL,
  isAdmin bool NOT NULL,
  PRIMARY KEY (username)
)

CREATE TABLE IF NOT EXISTS doctors (
  doctor_id int(5) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  specialization varchar(255) not null,
  department varchar (255) not null,
  PRIMARY KEY (doctor_id)
  )

CREATE TABLE IF NOT EXISTS billing (
  ohip int(9) NOT null,
  amount double not null,
  PRIMARY KEY (ohip)
)

 CREATE TABLE IF NOT EXISTS appointment (
 	appointment_id int(5) NOT NULL AUTO_INCREMENT, 
 	ohip int(9) NOT null,
	appointment_time datetime not null,
	doctor_id int(5) not null,
	PRIMARY KEY (appointment_id),
	foreign key (ohip) references patients (ohip),
	foreign key (doctor_id) references doctors (doctor_id)
)


```

### Populate Database

```
insert into patients values (123456789, 'Jack','Daniel','4160001231','2000-01-01','jd@email.com','Male','212 Streat Boulivard');
insert into patients values (111654987, 'Thanos','n/a','4161111111','1960-06-06','Thanos@email.com','Male','6 infitiy stones streat');
insert into patients values (456125489, 'John','Constantine','4164453554','1970-07-30','Constantine@email.com','Male','670 Avenue West');

insert into users values ('johndoe', 'jdoe@email.com','password',1);
insert into users values ('janedoe', 'janedoe@email.com','password',1);

insert into doctors values (10000,'Mike', 'Johns', 'GP','ER')
insert into doctors values (10010,'George', 'Jones', 'Infectious Diseases','Infectious Diseases')
insert into doctors values (10020,'Ann', 'Dorathy', 'General','Medicine')

insert into billing values (123456789, 45);
insert into billing values (456125489, 99);



```


