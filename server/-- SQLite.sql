-- 
CREATE TABLE FINANCE_COMPLAINTS(COMPLAINT_ID INTEGER PRIMARY KEY AUTOINCREMENT,USERNAME VARCHAR(20),time DATETIME,DESCRIPTION VARCHAR(700),STATUS VARCHAR(10));

INSERT INTO FINANCE_COMPLAINTS (USERNAME,time,DESCRIPTION,STATUS) VALUES ('1602-18-737-069@vce.ac.in','2021-05-28 12:51:09','kfujbulnm','Pending');
INSERT INTO FINANCE_COMPLAINTS (USERNAME,time,DESCRIPTION,STATUS) VALUES ('1602-18-737-078@vce.ac.in','2021-05-28 12:51:09','kfujbulnm','Pending');
INSERT INTO FINANCE_COMPLAINTS (USERNAME,time,DESCRIPTION,STATUS) VALUES ('1602-18-737-119@vce.ac.in','2021-05-28 12:51:09','kfujbulnm','Pending');
INSERT INTO FINANCE_COMPLAINTS (USERNAME,time,DESCRIPTION,STATUS) VALUES ('1602-18-737-017@vce.ac.in','2021-05-28 12:51:09','kfujbulnm','Pending');

SELECT * FROM FINANCE_COMPLAINTS;

CREATE TABLE USERS(
USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
USERNAME VARCHAR(50),
PASSWORD VARCHAR(40),
NAME VARCHAR(200),
DEPARTMENT VARCHAR(100),
CONTACT VARCHAR(10)
);

select * from users;

select * from students WHERE STUDENT_ID=1;
SELECT * FROM COMPLAINTS where STUDENT_ID=1;
select * from complaints;
SELECT COMPLAINT_ID, COMPLAINT_DESC,COMPLAINTS.DEPARTMENT,TIME,STATUS FROM COMPLAINTS INNER JOIN STUDENTS
  ON COMPLAINTS.STUDENT_ID = STUDENTS.STUDENT_ID where  STUDENTS.STUDENT_ID=1;
  SELECT
      *
    FROM
      complaints where department like 'finance'
    ORDER BY
      time DESC;

      DELETE from complaints where STUDENT_ID like NULL;