// importing
import express from "express";
import mongoose from "mongoose"
import linuxRoute from "./api/routes/linuxPlaybooks.js"
import windowsRoute from "./api/routes/windowsPlaybooks.js"
import otherPlaybookRoute from "./api/routes/otherPlaybooks.js"
import userRoute from "./api/routes/user.js"
import cors from "cors"
import requireJwtAuth from "../backend/api/middleware/check-auth.js"
import cookieParser from "cookie-parser";
import {spawn} from "child_process"
//import checkAuth from "../backend/api/middleware/check-auth.js"

//import SyslogServer from "ts-syslog";

// import SyslogServer from "ts-syslog";

// const server = new SyslogServer();

// server.on("message", (value) => {
//   console.log("---------------------------------------------"); // the date/time the message was received
//   console.log(value.message); // the syslog message
  
// });

// server.on("error", (err) => {
//   console.error("The error message is: "+err.message);
// });

// server.listen({ port: 5000 | process.env.port, address: "127.0.0.1"}, () => {
//   console.log("Syslog listening on port 5000");
// });
// server.isRunning()


// app config
const app = express()
const port = process.env.port || 9000

// middleware
app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: ["http://localhost:3000"],
  // methods:["GET","POST"],
  credentials: true
}))




app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Headers","*")
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    // res.setHeader("Access-Control-Allow-Methods", POST,GET,DELETE,OPTIONS)
    res.setHeader("Access-Control-Allow-Credentials", "true")
    next()
})

// DB config
const connection_url =
    "mongodb+srv://dawood:ZyhxBEChvGH8NBwR@cluster0.d3etlpl.mongodb.net/soarDB?retryWrites=true&w=majority";
mongoose.connect(connection_url)

// ???

// api routes


// );
app.get('/' ,(req, res) => res.status(200).send('hello world'))


app.use("/linuxPlaybooks", linuxRoute)
app.use("/windowsPlaybooks",windowsRoute)
app.use("/otherPlaybooks", otherPlaybookRoute)
app.use("/user", userRoute)


app.post("/recievePlaybook", requireJwtAuth,(req, res) => {
  // console.log("New data recieved")
  // console.log(req.body.playbooks)
  const playbooks = req.body.playbooks

  if (playbooks.length > 1) {
    var dataToSend;
    // spawn new child process to call ansible-runner.py
    const python = spawn("python3", playbooks);
    // collecting data from ansible-runner.py
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
      console.log("****************************------------------")
      console.log(dataToSend);
    });

    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      console.log(dataToSend)
      res.send(dataToSend); 
    });
  } else {
    console.log("no playbook to be executed");
    res.send();
  }
})


// app.get('/playbook', checkAuth, (req, res) => {
//   //verify the JWT token generated for the user
//   jwt.verify(req.token,"this is dummy text",(err, authorizedData) => {
//       if(err){
//           //If error send Forbidden (403)
//           console.log('ERROR: Could not connect to the protected route');
//           res.sendStatus(403);
          
//       } else {
//           //If token is successfully verified, we can send the autorized data 
          
//           res.json({
//               message: 'Successful log in',
//               authorizedData
//           });
//           console.log('SUCCESS: Connected to protected route');
          
          
//       }
//   })
  
// });

// listen
app.listen(port, "127.0.0.1" ,() => console.log(`Listening on localhost:${port}`))