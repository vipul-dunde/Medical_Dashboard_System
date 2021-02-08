DROP TABLE `USERS`;

CREATE TABLE `users`(
    name VARCHAR(20),
    email varchar(30) primary key,
    password varchar(500)
    /*hashed password*/ 
);

SELECT * FROM users;
select name FROM USERS where email='xyz@gmail.com';

CREATE TABLE `ROOMS`(
	id    int(5) primary key auto_increment,
    section VARCHAR(2),
    floor int,
    primary key(id)
);

SELECT * FROM ROOMS;

DROP TABLE `ADDPATIENT`;


CREATE TABLE `ADDPATIENT`(
	id    int(5) primary key auto_increment,
	FNAME	VARCHAR(30),
    LNAME	VARCHAR(30),
    Disease  varchar(500),
    date    DATE,
    sex     varchar(10),
    cndn  varchar(10)	
);

ALTER TABLE `ADDPATIENT`
ADD `EMERGENCY` VARCHAR(10) ;

SELECT * FROM `ADDPATIENT`;


DROP TABLE `ADDDOCTOR`;

CREATE TABLE `ADDDOCTOR`(
	id    int(5) primary key auto_increment,
	fname		varchar(50),
    lname 	varchar(50),
    degree   varchar(50),
    spe			varchar(50),
    expr		int(2),
    descr		varchar(500)
);

SELECT * FROM `ADDDOCTOR`;

DROP TABLE IF EXISTS `complain`;

CREATE TABLE `complain` (
--   `id` int(11) DEFAULT NULL,
--   `dof` date DEFAULT NULL,
	`id`   int(5) primary key auto_increment,
  `name` varchar(30) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL
);

SELECT * FROM `complain`;

/*ADD STAFF */

DROP TABLE `ADDNURSE`;

CREATE TABLE `ADDNURSE`(
	id    int(5) primary key auto_increment,
	fname		varchar(50),
    lname 	varchar(50),
    degree   varchar(50),
    spe			varchar(50),
    expr		int(2),
    descr		varchar(500)
);

SELECT * FROM `ADDNURSE`; 
SELECT ID FROM ADDNURSE WHERE FNAME="Abcd";

DROP TABLE `ADDSTAFF`;

CREATE TABLE `ADDSTAFF`(
	id    int(5) primary key auto_increment,
	fname		varchar(50),
    lname 	varchar(50),
    degree   varchar(50),
    spe			varchar(50),
    expr		int(2),
    descr		varchar(500)
);

SELECT * FROM `ADDSTAFF`; 

CREATE TABLE  EMERGENCYE(
		id    int(5) primary key 
);

select  ID AS NEW_ID FROM ADDPATIENT where EMERGENCY='YES';
INSERT into EMERGENCYE(ID) VALUES(NEW_ID);





 