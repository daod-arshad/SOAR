import express from "express";
import Alert from "../schema/alertSchema.js";
const router = express.Router();
const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    console.log(`key: ${key}, value: ${obj[key]}`);
    //if (key.name.value=='windows_eventchannel'){console.log('win')}

    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterate(obj[key]);
    }
  });
};

router.post("/sa", async (req, res) => {
  var record = alertSchema({
    date: req.body.date,
    time: req.body.time,
    os: req.body.os,
    recievedAlert: req.body.alert,
  });

  record
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//quarter circle pie  alerts --- mapped based on --- level
router.get("/receiveBarGraphData", async (req, res) => {
  try {
    let docs = await Alert.aggregate([
      { $match: { date: req.query.query_date } },
      {
        $group: {
          _id: "$recievedAlert.rule.level",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// pie chart alerts --- os type
router.get("/receivePiechartData", async (req, res) => {
  try {
    let docs = await Alert.aggregate([
      { $match: { date: req.query.query_date } },
      {
        $group: {
          _id: "$os",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/receiveTableData", async (req, res) => {
  try {
    let docs = await Alert.aggregate([
      { $match: { date: req.query.query_date } },
      {
        $project: {
          _id: 0,
          time: "$time",
          ruleDescription: "$recievedAlert.rule.description",
          agentName: "$recievedAlert.agent.name",
          ruleLevel: "$recievedAlert.rule.level",
          ruleId: "$recievedAlert.rule.id",
        },
      },
    ]);
    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/Columnplotwithslider", async (req, res) => {
  try {
    let result = await Alert.aggregate([
      { $match: { date: req.query.query_date } },
      {
        $group: { _id: "$recievedAlert.agent.id", count: { $sum: 1 } },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/alertCount", async (req, res) => {
  try {
    let count = await Alert.count({ date: req.query.query_date });
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/alertCountRuleId", async (req, res) => {
  try {
    let docs = await Alert.aggregate([
      { $match: { date: req.query.query_date } },
      { $match: { "recievedAlert.rule.id": "60106" } },
      {
        $group: {
          _id: "$recievedAlert.rule.id",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
