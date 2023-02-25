import express from "express";
import resultSchema from "../schema/resultsSchema.js";

const router = express.Router()

router.post("/new", (req, res) => {
    const result = req.body;
  
    resultSchema.create(result, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

router.get("/find", (req, res) => {
    resultSchema.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
});
  
export default router