import WindowsPlaybooksUpdated from "../schema/windowsPlaybookSchemaUpdated.js";
import express from "express"
import checkAuth from "../middleware/check-auth.js"

const router = express.Router()

router.post("/new", (req, res) => {
  const windowsPlaybook = req.body;

  WindowsPlaybooksUpdated.create(windowsPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/find", (req, res) => {
  WindowsPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});


export default router