// importing
import express from "express";
import mongoose from "mongoose"
import LinuxPlaybooksUpdated from "./schema/linuxPlaybooksSchemaUpdated.js"
import WindowsPlaybooksUpdated from "./schema/windowsPlaybookSchemaUpdated.js"
import OtherPlaybooksUpdated from "./schema/otherPlaybookSchemaUpdated.js"
import cors from "cors"

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

app.post('/linuxPlaybooks/new', (req, res) => {
    const linuxPlaybook = req.body

    LinuxPlaybooksUpdated.create(linuxPlaybook, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
})
app.get("/linuxPlaybooks/find", (req, res) => {

  LinuxPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});



app.post("/windowsPlaybooks/new", (req, res) => {
  const windowsPlaybook = req.body;

  WindowsPlaybooksUpdated.create(windowsPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/windowsPlaybooks/find", (req, res) => {
  WindowsPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});




app.post("/otherPlaybooks/new", (req, res) => {
  const otherPlaybook = req.body;

  OtherPlaybooksUpdated.create(otherPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/otherPlaybooks/find", (req, res) => {
  OtherPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/recievePlaybook", (req, res) => {
  console.log("new data recieved")
  console.log(req.body.playbooks)
})


// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))