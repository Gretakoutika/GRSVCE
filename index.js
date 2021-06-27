const express = require("express");
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require("sqlite")
const cors = require('cors');
const app = express();
//const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const { Console } = require("console");
const PORT=process.env.PORT || 4000;
//app.use(express.static(path.join(__dirname,"client/build")))

app.use(cors());

app.use(express.json());

/*const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://grsvce.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));*/
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const dbPath = path.join(__dirname, "complaints.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
    /*const proConfig={
      connectionString: process.env.DATABASE_URL //heroku addon
    }*/
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "RSGECV", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};


app.post("/login",async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM USERS WHERE USERNAME = '${username}'`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid User");
  } else {
    console.log(password);
    console.log(dbUser.PASSWORD)
    const isPasswordMatched = (password === dbUser.PASSWORD) ?true:false;
    console.log(isPasswordMatched);
    if (isPasswordMatched === true) {
      const userType=dbUser.TYPE;
      const userid=dbUser.USER_ID;
      console.log(userType);
      const payload={"type":"success","user_type":userType,userid};
      const secret="RSGECV";
      const jwttoken=jwt.sign(payload,secret);
      const result={"type":"success","user_type":userType,userid,jwttoken};
      response.send(result);
    } else {
      response.status(400);
      const result={"type":"Invalid Password"};
      response.send(result);
    }
  }
});

app.get("/students/:id/complaints", authenticateToken,async (request, response) => {
        const { id } = request.params;
        const {status}= request.query;
        console.log(id);
        var getStudent_Complaints_Query="";
        if(status==='Pending'){
          getStudent_Complaints_Query=`SELECT COMPLAINT_ID, COMPLAINT_DESC,COMPLAINTS.DEPARTMENT,TIME,STATUS FROM COMPLAINTS INNER JOIN STUDENTS
          ON COMPLAINTS.STUDENT_ID = STUDENTS.STUDENT_ID where  STUDENTS.STUDENT_ID=${id} and STATUS='${status}' order by 1 desc`;
        }
        else{
          getStudent_Complaints_Query=`SELECT cmp.student_id as     student_id,
          sol.complaint_id as complaint_id,
          cmp.COMPLAINT_DESC as complaint_descp,
          sol.description as solution_descp,
          sol.time as solvedtime,
          department
          FROM (
              SELECT comp.complaint_id AS complaint_id, comp.complaint_desc,stud.student_id,comp.department as department
                FROM (
                         SELECT *FROM complaints
                     )
                     comp
                     LEFT OUTER JOIN
                     (
                         SELECT * FROM students
                     )
                     stud ON comp.STUDENT_id = stud.student_id
          )
          cmp
          INNER JOIN( SELECT * FROM solutions
          )
          sol ON cmp.Complaint_id = sol.complaint_id where student_id=${id}` ;
        }
        
        const studentComplaintDetails = await db.all(getStudent_Complaints_Query);
        console.log(studentComplaintDetails);
        response.send(studentComplaintDetails);
  
});

app.post("/students/:id/complaints", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const complaintDetails=request.body;
    const {department,complaintDesc,selectedFacultyId,complaint_type}=complaintDetails;
    const date=`select DATETIME('now','localtime') as Datetime`;
    const dateResponse=await db.get(date);
    console.log(dateResponse.Datetime);
    const sqlQuery = `insert into complaints(complaint_desc,department,time,status,student_id,SELECTED_FACULTY_ID,TYPE,forward_status)values('${complaintDesc}','${department}','${dateResponse.Datetime}','Pending',${id},${selectedFacultyId},'${complaint_type}','Forward');`;
    const dbresponse= await db.run(sqlQuery);
    response.send("Complaint added successfully");
});

app.put('/students/:id/complaints',async(request,response)=>{
    
  const {id} = request.params;
  console.log(id);
  const ids=request.body;
  const{forwardstatus,complaintid}=ids;
  const complaint_id=parseInt(complaintid);
  console.log(forwardstatus,complaint_id);
  const sqlQuery=`update complaints set forward_status='${forwardstatus}' where student_Id=${id} and complaint_id=${complaint_id}`;
  const Studentsobject=await db.run(sqlQuery);
  response.send("Updation Sucessfull");
});


app.get("/students/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const getStudent_Query = `SELECT * FROM  STUDENTS WHERE STUDENT_ID = ${id};`;
  const studentDetails = await db.get(getStudent_Query);
  response.send(studentDetails);
});

app.get("/faculty/", async (request, response) => {
  const {dept}=request.query;
  const getlecturer_Query = `SELECT USER_ID,NAME FROM  USERS WHERE DEPARTMENT LIKE upper('${dept}') and TYPE LIKE 'Faculty';`;
  const LecturerDetails = await db.all(getlecturer_Query);
  response.send(LecturerDetails);
});

app.get("/faculty/:id/complaints",authenticateToken, async (request, response) => {
  const { id } = request.params;
  const {status}= request.query;
  console.log(id);
  const getFaculty_Complaints_Query=`select complaints.complaint_id,complaints.student_id,students.FIRST_NAME,students.LAST_NAME,complaint_desc,time,status from complaints inner join students on complaints.student_id==students.STUDENT_ID where selected_faculty_id = ${id} and status='${status}' and complaints.forward_status like 'Forwarded' order by complaints.TIME desc;`;
  const  Faculty_ComplaintDetails= await db.all(getFaculty_Complaints_Query);
  console.log(Faculty_ComplaintDetails);
  response.send(Faculty_ComplaintDetails);
});


app.get("/academiccomplaints/",async(request,response)=>{
  const {dept}=request.query;
  const getComplaintsDepartment=`
  SELECT COMPLAINT_ID, STUDENT_ID,TIME, COMPLAINT_DESC,SELECTED_FACULTY_ID,STATUS,NAME,forward_status FROM COMPLAINTS INNER JOIN USERS
  ON COMPLAINTS.SELECTED_FACULTY_ID = USERS.USER_ID  where complaints.TYPE like 'Academic' and complaints.DEPARTMENT like '${dept}' order by time desc;`;
const complaintsArray = await db.all(getComplaintsDepartment);
console.log(complaintsArray);
response.send(complaintsArray);
});



app.get("/nonacademiccomplaints/",async(request,response)=>{
  const {dept}=request.query;
  const getComplaintsDepartment=`
  SELECT
      *
    FROM
      complaints where department like '${dept}'
    ORDER BY
      time DESC;`;
const complaintsArray = await db.all(getComplaintsDepartment);
console.log(complaintsArray);
response.send(complaintsArray);
});



app.get("/faculty/:id/:complaint_id/",async(request,response)=>{
  const {id,complaint_id}=request.params;
  const getComplaint=`
  select complaints.complaint_id,complaints.student_id,students.FIRST_NAME,students.LAST_NAME,complaint_desc,time,status,students.USERNAME from complaints inner join students on complaints.student_id==students.STUDENT_ID where selected_faculty_id = ${id} and complaint_id=${complaint_id}`;
const complaint= await db.get(getComplaint);
console.log(complaint);
response.send(complaint);
});


app.post("/:complaint_id/solution", async (request, response) => {
  const { complaint_id } = request.params;
  console.log(complaint_id);
  const {solution}=request.body;
    const date=`select DATETIME('now','localtime') as Datetime`;
    const dateResponse=await db.get(date);
    console.log(dateResponse.Datetime);
    const sqlQuery = `insert into solutions(description,complaint_id,time)values('${solution}',${complaint_id},'${dateResponse.Datetime}');`;
    const dbresponse= await db.run(sqlQuery);
    response.send("Solution added successfully");
});

app.put('/:complaint_id/changestatus',async(request,response)=>{
    
  const { complaint_id } = request.params;
  console.log(complaint_id);
  const sqlQuery=`update complaints set status='Solved' where complaint_id=${complaint_id}`;
  const Studentsobject=await db.run(sqlQuery);
  response.send("Updation Sucessfull");
});
initializeDBAndServer();

