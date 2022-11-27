import OtherPlaybooksUpdated from "../schema/otherPlaybookSchemaUpdated.js";
import express from "express"

const router = express.Router()

router.post("/new", (req, res) => {
  const otherPlaybook = req.body;

  OtherPlaybooksUpdated.create(otherPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/find", (req, res) => {
  OtherPlaybooksUpdated.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});


export default router