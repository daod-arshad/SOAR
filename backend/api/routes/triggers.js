import express from "express";
import triggerSchema from "../schema/triggerSchema.js";
import date from "date-and-time"

const router = express.Router()
const now = Date()
router.post("/save", (req, res) => {
    const Trigger = req.body
    triggerSchema.create(Trigger, async(err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
})

export default router