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
        // res.status(201).send(data);
        // console.log(data[0])
        for (var i = 0; i < data.length; i++){
          data[i].data = Buffer.from(data[i].data, "base64").toString("ascii"); 
        }
        res.status(201).send(data);
      }
    });
});

router.get("/playbookCount", async (req, res) => {
  try {
    let docs = await resultSchema.aggregate([
      {
        $group: {
          _id: "",
          noOfPlaybooks: { $sum: "$noOfPlaybooks" },
        },
      },
      {
        $project: { _id: 0, TotalPlayBooksRun: "$noOfPlaybooks" },
      },
    ]);
    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
  
export default router