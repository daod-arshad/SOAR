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
import { Queue, Worker, QueueEvents, Job} from 'bullmq';
import Redis from 'ioredis';
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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000","http://localhost:6379")
    res.setHeader("Access-Control-Allow-Headers","*")
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    // res.setHeader("Access-Control-Allow-Methods", POST,GET,DELETE,OPTIONS)
    res.setHeader("Access-Control-Allow-Credentials", "true")
    next()
})

//Create a Redis connection
const redis1 = new Redis({ host: 'localhost', port: 6379, maxRetriesPerRequest: null});
try {
await redis1.ping();
console.log('Connected to Redis successfully!');
} catch (error) {
console.error('Failed to connect to Redis:', error);
} 

//queues
const queue = new Queue('queueName', {redis1} );
const authqueue = new Queue('Auto-queue',{redis1})


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

app.post("/recievePlaybook",async(req, res) => {
  const playbooks = req.body.playbooks
  // console.log(playbooks.length)
  // console.log(playbooks)

  if (playbooks.length > 1) {
    var dataToSend = ''
    //Adding playbooks to queue
    const job = await queue.add('ProcessPlaybooks', playbooks);
    console.log(`Job ${job.id} added to the queue.`)
    res.json({message: 'Playbooks added to queue'})
    console.log("I am here")
  }
});

//Playbook processing function
function processPlaybooks(playbooks) {
  return new Promise((resolve, reject) => {
    var dataToSend = '';
    // spawn new child process to call ansible-runner.py
    const python = spawn("python3", playbooks);
    // collecting data from ansible-runner.py
    python.stdout.on("data", function (data) {
      dataToSend += data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      if (dataToSend == '') {
        dataToSend += "There has been an error in playbook execution";
      }
      // console.log(dataToSend);
      axios.post("/result/new", {
        date: date.format(now, "YYYY-MM-DD"),
        time: date.format(now, "HH:mm:ss"),
        noOfPlaybooks: playbooks.length,
        data: stripAnsi(dataToSend),
      })
      .then((response) => {
        console.log(response.data);
        resolve(dataToSend); // Resolve the promise with the collected data
      })
      .catch((error) => {
        reject(error); // Reject the promise if there's an error in the axios post request
      });
    });
  });
}

  

//Creating playbook worker
const playbookWorker = new Worker('queueName', async (job) => {
const playbookData = job.data; // Retrieve playbooks data from the job

  
try {
  processPlaybooks(playbookData);
// Handle the result or update the database if needed
console.log("Playbooks processed !!!");
} catch (error) {
console.error("Error processing playbooks:", error);
}
}, 
{concurrency: 5},);

 



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

server.listen({ port: 5000 | process.env.port, address: "172.18.16.5"}, () => {
  console.log("Syslog listening on port 5000");
});
server.isRunning()


// server.on("message", (value) => {
//   console.log("---------------------------------------------"); // the date/time the message was received
//   console.log(value.message); // the syslog message
// let mainAlert = value.message.substring(value.message.indexOf("{") + 1);
// var alertTobeSent='{'+mainAlert;
// alertTobeSent=alertTobeSent.replace(/(\t) | (\r) | (\n)/gmi, '')
// alertTobeSent=alertTobeSent.replace(/[\""]/gmi,'"')
// alertTobeSent=alertTobeSent.replace(/["\"]/gmi,'"')
// alertTobeSent=alertTobeSent.replace(/(\\\\) | (\\)/gmi, "/")
// var parsedAlert=JSON.parse(alertTobeSent);
// console.log(parsedAlert)
// // let copyoftriggers=[];
// // console.log("Original fields before automation",triggers[1]["nodes"][1]["data"]["values"])
// automation(triggers,parsedAlert);
// var foundTime = parsedAlert.timestamp.substring(parsedAlert.timestamp.indexOf("T")+1)
// var foundDate = parsedAlert.timestamp.substring(0,parsedAlert.timestamp.indexOf("T"))
// console.log("I am here")
// axios.post("/Alert/sa",{
//   date: foundDate,
//   time: foundTime,
//   os: parsedAlert.decoder.name,
//   alert: parsedAlert,

// }).then((response) => {
//   // console.log(response.data)
// }, []).catch((err) => console.log("hello"));
// // server.on("message", (value) => {
// //   console.log("---------------------------------------------"); // the date/time the message was received
// //   console.log(value.message); // the syslog message

  
// });


// function automation(triggers,parsedAlert){

server.on("message", (value) => {
  try{
  console.log("---------------------------------------------"); // the date/time the message was received
  // console.log(value.message); // the syslog message
  // console.log("heheh")
  let mainAlert = value.message.substring(value.message.indexOf("{") + 1);
  var alertTobeSent='{'+mainAlert;
  alertTobeSent=alertTobeSent.replace(/(\t) | (\r) | (\n)/gmi, '')
  alertTobeSent=alertTobeSent.replace(/[\""]/gmi,'"')
  alertTobeSent=alertTobeSent.replace(/["\"]/gmi,'"')
  alertTobeSent=alertTobeSent.replace(/(\\\\) | (\\)/gmi, "/")
  var parsedAlert=JSON.parse(alertTobeSent);
  //console.log("PARSED ALERT:",parsedAlert)
  // console.log("I am here")
  //Adding playbooks to queue
  const job1 = authqueue.add('AutomatedPlaybooks', {parsedAlert,triggers});
  console.log(`Automated Job ${job1.id} added to the queue.`)
  
  // let copyoftriggers=[];
  // console.log("Original fields before automation",triggers[1]["nodes"][1]["data"]["values"])
  
  
  //Automation Playbook worker
  const AutoplaybookWorker = new Worker('Auto-queue', async (job1) => {
  // Retrieve the parsed alert and triggers from the job
  const { parsedAlert, triggers } = job1.data;
  
  automation(triggers,parsedAlert);
  var foundTime = parsedAlert.timestamp.substring(parsedAlert.timestamp.indexOf("T")+1)
  var foundDate = parsedAlert.timestamp.substring(0,parsedAlert.timestamp.indexOf("T"))
 
  axios.post("/Alert/sa",{
  date: foundDate,
  time: foundTime,
  os: parsedAlert.decoder.name,
  alert: parsedAlert,
  }).then((response) => {
  console.log(response.data, "shaasdflkjsdlkfjslkdfjlksdkfjlskdjfk")
  }, []);
  }); 
  console.log("above api")
  }catch(err){
    console.log(err)
    console.log("An error occured.")
  }

});

  
//Automated processing function
function automation(triggers,parsedAlert){
  console.log(parsedAlert["rule"]["id"])
  for(let i=0;i<triggers.length;i++){
  if(triggers[i]["ruleId"]==parsedAlert["rule"]["id"]){
  var copyoftriggers = JSON.parse(JSON.stringify(triggers[i]));
  for(let j=1;j<copyoftriggers["nodes"].length;j++){
  // console.log(triggers[i]["nodes"][j]["data"]["values"])
  for(let k=0;k<copyoftriggers["nodes"][j]["data"]["values"].length;k++){
  // console.log(copyoftriggers[i]["nodes"][j]["data"]["values"][k])
  var valueOfField = copyoftriggers["nodes"][j]["data"]["values"][k];
  // console.log("values of field is",valueOfField)
  valueOfField = valueOfField.split(".")
  // console.log(valueOfField)
  var temp=parsedAlert;
  for(let l=0;l<valueOfField.length;l++){
  temp = temp[valueOfField[l]]
  }
  // console.log(temp)
  copyoftriggers["nodes"][j]["data"]["values"][k] = temp;
  }
  }
  // console.log("copy in trigger",copyoftriggers["nodes"][1]["data"]["values"][0])
  // console.log("copy in trigger",copyoftriggers["nodes"])
  const playbooksToBeExecuted = ["ansible-runner.py"]
  for(let f=1;f<copyoftriggers["nodes"].length;f++){
  playbooksToBeExecuted.push(JSON.stringify(copyoftriggers["nodes"][f])) 
  }
  // console.log("copy in trigger after loop",playbooksToBeExecuted)
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
// }