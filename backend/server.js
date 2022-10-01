// importing
import express from "express";
import mongoose from "mongoose"
import LinuxPlaybooks from "./schema/linuxPlaybookSchema.js"
import WindowsPlaybooks from "./schema/windowsPlaybookSchema.js"
import OtherPlaybooks from "./schema/otherPlaybookSchema.js"
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

    LinuxPlaybooks.create(linuxPlaybook, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get("/linuxPlaybooks/find", (req, res) => {

  LinuxPlaybooks.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});



app.post("/windowsPlaybooks/new", (req, res) => {
  const windowsPlaybook = req.body;

  WindowsPlaybooks.create(windowsPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/windowsPlaybooks/find", (req, res) => {
  WindowsPlaybooks.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});




app.post("/otherPlaybooks/new", (req, res) => {
  const otherPlaybook = req.body;

  OtherPlaybooks.create(otherPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/otherPlaybooks/find", (req, res) => {
  OtherPlaybooks.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});



// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))