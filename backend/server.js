// importing
import express from "express";
import mongoose from "mongoose"
import linuxRoute from "./api/routes/linuxPlaybooks.js"
import windowsRoute from "./api/routes/windowsPlaybooks.js"
import otherPlaybookRoute from "./api/routes/otherPlaybooks.js"
import userRoute from "./api/routes/user.js"
import alertRoute from "./api/routes/alerts.js"
import resultRoute from "./api/routes/results.js"
import cors from "cors"
import requireJwtAuth from "../backend/api/middleware/check-auth.js"
import cookieParser from "cookie-parser";
import {spawn} from "child_process"
import axios from "./axios.js";
import date from "date-and-time"
import stripAnsi from "strip-ansi"
import triggerRoute from "./api/routes/triggers.js"
//import checkAuth from "../backend/api/middleware/check-auth.js"

// app config
const app = express()
const port = process.env.port || 9000
const now = new Date()
// middleware
app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: ["http://localhost:3000"],
  // methods:["GET","POST"],
  credentials: true
}))

let triggers = []

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
app.use("/windowsPlaybooks", windowsRoute)
app.use("/otherPlaybooks", otherPlaybookRoute)
app.use("/user", userRoute)
app.use("/Alert",alertRoute);
app.use("/result", resultRoute);
app.use("/triggers", triggerRoute)

app.post("/recievePlaybook",(req, res) => {
  // console.log("New data recieved")
  // console.log(req.body.playbooks)
  const playbooks = req.body.playbooks
  console.log(playbooks.length)
  console.log(playbooks)
  console.log("I am here")
  if (playbooks.length > 1) {
    var dataToSend = '';
    // spawn new child process to call ansible-runner.py
    const python = spawn("python3", playbooks);
    // collecting data from ansible-runner.py
    python.stdout.on("data", function (data) {
      dataToSend += data.toString();
      // console.log(dataToSend);
      
    });
    // console.log("I am down")
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      if(dataToSend == ''){
        dataToSend += "There has been an error in playbook execution"
      }
      console.log(dataToSend)
      // console.log("I am above axios")
      axios.post("/result/new",{
        date: date.format(now,"YYYY-MM-DD"),
        time: date.format(now,"HH:mm:ss"),
        noOfPlaybooks: playbooks.length,
        data: stripAnsi(dataToSend)
      }).then((response) => {
        // console.log(playbookResults)
          console.log(response.data)  
        }, []);
    });
  } else {
    console.log("no playbook to be executed");
    // res.send();
  }
//  Buffer.from("SGVsbG8gV29ybGQ=", "base64").toString("ascii");
})





// listen

app.listen(port, "127.0.0.1" ,() => console.log(`Listening on localhost:${port}`))
triggers =await axios.get("/triggers/find").then((response) => {
  return response.data;
  // setwindowsPlaybooks(response.data);
});
console.log(triggers)






import SyslogServer from "ts-syslog";

const server = new SyslogServer();

// server.on("message", (value) => {
//   console.log("---------------------------------------------"); // the date/time the message was received
//   console.log(value.message); // the syslog message
  
// });

server.on("error", (err) => {
  console.error("The error message is: "+err.message);
});

server.listen({ port: 5000 | process.env.port, address: "192.168.0.108"}, () => {
  console.log("Syslog listening on port 5000");
});
server.isRunning()

server.on("message", (value) => {
  console.log("---------------------------------------------"); // the date/time the message was received
  // console.log(value.message); // the syslog message
let mainAlert = value.message.substring(value.message.indexOf("{") + 1);
var alertTobeSent='{'+mainAlert;
alertTobeSent=alertTobeSent.replace(/(\t) | (\r) | (\n)/gmi, '')
alertTobeSent=alertTobeSent.replace(/[\""]/gmi,'"')
alertTobeSent=alertTobeSent.replace(/["\"]/gmi,'"')
alertTobeSent=alertTobeSent.replace(/(\\\\) | (\\)/gmi, "/")
var parsedAlert=JSON.parse(alertTobeSent);
// console.log(parsedAlert)
// let copyoftriggers=[];
// console.log("Original fields before automation",triggers[1]["nodes"][1]["data"]["values"])
automation(triggers,parsedAlert);
var foundTime = parsedAlert.timestamp.substring(parsedAlert.timestamp.indexOf("T")+1)
var foundDate = parsedAlert.timestamp.substring(0,parsedAlert.timestamp.indexOf("T"))
axios.post("/Alert/sa",{
  date: foundDate,
  time: foundTime,
  os: parsedAlert.decoder.name,
  alert: parsedAlert,

}).then((response) => {
  // console.log(response.data)
}, []);
  
});

function automation(triggers,parsedAlert){
  
  console.log(parsedAlert["rule"]["id"])
  for(let i=0;i<triggers.length;i++){
    if(triggers[i]["ruleId"]==parsedAlert["rule"]["id"]){
      
    var copyoftriggers = JSON.parse(JSON.stringify(triggers[i]));
    console.log(copyoftriggers)
    
      for(let j=1;j<copyoftriggers["nodes"].length;j++){
        console.log(triggers[i]["nodes"][j]["data"]["values"])
        for(let k=0;k<copyoftriggers["nodes"][j]["data"]["values"].length;k++){
          // console.log(copyoftriggers[i]["nodes"][j]["data"]["values"][k])
          var valueOfField = copyoftriggers["nodes"][j]["data"]["values"][k];
          
          console.log("values of field is:",valueOfField)
          valueOfField = valueOfField.split(".")
          console.log(valueOfField)
          var temp=parsedAlert;
          for(let l=0;l<valueOfField.length;l++){
            temp = temp[valueOfField[l]]
          }
          console.log("this is temp:",temp)
          copyoftriggers["nodes"][j]["data"]["values"][k] = temp;
          console.log(copyoftriggers["nodes"][j]["data"]["values"])
        }
      }
      // console.log("copy in trigger",copyoftriggers["nodes"][1]["data"]["values"][0])
      // console.log("copy in trigger",copyoftriggers["nodes"])
      const playbooksToBeExecuted = ["ansible-runner.py"]
      for(let f=1;f<copyoftriggers["nodes"].length;f++){
        // console.log(copyoftriggers["nodes"][i])
        playbooksToBeExecuted.push(JSON.stringify(copyoftriggers["nodes"][f])) 
      }
      console.log("copy in trigger after loop",playbooksToBeExecuted)
      axios
      .post("/recievePlaybook", {
        playbooks: playbooksToBeExecuted,
      })
      .then((response) => {
        console.log("REcieved Data")
        console.log(response.data);
      }, []);
      break;
    }
  }
}