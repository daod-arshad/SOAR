import express from "express";
import LinuxPlaybooksUpdated from "../schema/linuxPlaybooksSchemaUpdated.js";


const router = express.Router()

router.post("/new", (req, res) => {
  const linuxPlaybook = req.body;

  LinuxPlaybooksUpdated.create(linuxPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
router.get("/find", (req, res) => {
  LinuxPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});


export default router