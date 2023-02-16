// importing
import express from "express";
import mongoose from "mongoose"
import linuxRoute from "./api/routes/linuxPlaybooks.js"
import windowsRoute from "./api/routes/windowsPlaybooks.js"
import otherPlaybookRoute from "./api/routes/otherPlaybooks.js"
import userRoute from "./api/routes/user.js"
import alertRoute from "./api/routes/alerts.js"
import cors from "cors"
import { spawn } from "child_process"
import SyslogServer from "ts-syslog";
import axios from "./axios.js"

const server = new SyslogServer();
server.on("error", (err) => {
  console.error("The error message is: "+err.message);
});
server.listen({ port: 5000 | process.env.port, address: "172.16.16.180"}, () => {
  console.log("Syslog listening on port 5000");
});
server.isRunning()

// app config
const app = express()
const port = process.env.port || 9000

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

// DB config
const connection_url =
    "mongodb+srv://dawood:ZyhxBEChvGH8NBwR@cluster0.d3etlpl.mongodb.net/soarDB?retryWrites=true&w=majority";
mongoose.connect(connection_url)

// ???

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.use("/linuxPlaybooks", linuxRoute)
app.use("/windowsPlaybooks",windowsRoute)
app.use("/otherPlaybooks", otherPlaybookRoute)
app.use("/user", userRoute)
app.use("/alerts", alertRoute)

app.post("/recievePlaybook", (req, res) => {
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

server.on("message", (value) => {
  console.log("---------------------------------------------"); // the date/time the message was received
  console.log(value.message); // the syslog message
let mainAlert = value.message.substring(value.message.indexOf("{") + 1);
var alertTobeSent='{'+mainAlert;
alertTobeSent=alertTobeSent.replace(/(\t) | (\r) | (\n)/gmi, '')
alertTobeSent=alertTobeSent.replace(/[\""]/gmi,'"')
alertTobeSent=alertTobeSent.replace(/["\"]/gmi,'"')
alertTobeSent=alertTobeSent.replace(/(\\\\) | (\\)/gmi, "/")
var parsedAlert=JSON.parse(alertTobeSent)
console.log(parsedAlert)
var foundTime = parsedAlert.timestamp.substring(parsedAlert.timestamp.indexOf("T")+1)
var foundDate = parsedAlert.timestamp.substring(0,parsedAlert.timestamp.indexOf("T"))
axios.post("/alerts/sa",{
  date: foundDate,
  time: foundTime,
  os: parsedAlert.decoder.name,
  alert: parsedAlert,

}).then((response) => {
  console.log(response.data)  
}, []);
  
});


// listen
app.listen(port,"172.16.16.180",() => console.log(`Listening on localhost:${port}`))