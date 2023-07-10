import express from "express";
import alertSchema from "../schema/alertSchema.js";
import Alert from "../schema/alertSchema.js";
const router = express.Router();
const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    console.log(`key: ${key}, value: ${obj[key]}`);
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
//quarter circle pie  alerts --- mapped based on --- os
router.get("/receiveBarGraphData", async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    }
    if (formattedDate1 && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }
    const groupStage = {
      $group: {
       _id: '$os',
        count: { $sum: 1 }
      }
    };
    const pipeline = [
      { $match: matchStage },
      groupStage
    ];
    const docs = await Alert.aggregate(pipeline);
    res.status(200).json(docs);
    console.log(docs)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

// pie chart alerts --- Rule level
router.get("/receivePiechartData", async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) { 
      matchStage.date =req.query.query_date2;
    }
    if (formattedDate1 && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }
    const groupStage = {
      $group: {
       _id: '$recievedAlert.rule.level',
        count: { $sum: 1 }
      }
    };
    const pipeline = [
      { $match: matchStage },
      groupStage
    ];
    const docs = await Alert.aggregate(pipeline);
    res.status(200).json(docs);
    console.log(docs)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

router.get("/receiveTableData", async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date1) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) {
  
      matchStage.date =req.query.query_date2;
    }

    if (formattedDate1 && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }
     const projectStage = {
      $project: {
        _id: 0,
        time: '$time',
        date: '$date',
        agentName: '$recievedAlert.agent.name',
        ruleLevel: '$recievedAlert.rule.level',
        ruleId:'$recievedAlert.rule.id',
        ruleDescription:'$recievedAlert.rule.description'

      }
    };
    const sortStage = {
      $sort: {
        date: -1, 
        time: -1, 
      },
    };
    const pipeline = [
      { $match: matchStage },
      projectStage,
      sortStage
    ];
    const docs = await Alert.aggregate(pipeline);
    res.status(200).json(docs);
    console.log(docs)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});
 //based on agent ID
router.get("/Columnplotwithslider", async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) {
      matchStage.date =req.query.query_date2;
    }

    if (formattedDate1  && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }
    const groupStage = {
      $group: {
       _id: '$recievedAlert.agent.id',
        count: { $sum: 1 }
      }
     
    };
    const pipeline = [
      { $match: matchStage },
      groupStage
    ];
    const docs = await Alert.aggregate(pipeline);
    res.status(200).json(docs);
    console.log(docs)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});
router.get('/alertCount', async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) {
      matchStage.date =req.query.query_date2;
    }

    if (formattedDate1 && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }

    const groupStage = {
        $group: {
          _id: null,
          AlertCount: { $sum:1 },
        }
      };

    const pipeline = [
      { $match: matchStage },
      groupStage,
    ];
    const docs = await Alert.aggregate(pipeline);
    const totalCount = docs.length > 0 ? docs[0].AlertCount : 0;

    res.status(200).json(totalCount);
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }

});
router.get('/alertCountRuleId', async (req, res) => {
  try {
    var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) {
      console.log('inside else if')
      matchStage.date =req.query.query_date2;
    }

    if (formattedDate1 && req.query.query_date1==req.query.query_date2) {
      matchStage.time = { $gte: formattedDate2, $lte: formattedDate1 };
    }
   
    matchStage['recievedAlert.rule.id'] = '80730';
    
    const groupStage = {
      $group: {
       _id: '$recievedAlert.rule.id',
        count: { $sum: 1 }
      }
    };
    const pipeline = [
      { $match: matchStage },
      groupStage
    ];
    const docs = await Alert.aggregate(pipeline);
    console.log(docs)
    res.status(200).json(docs);

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

//scatter plot to show alerts from agents over multiple days
router.get('/scatter', async (req, res) => {
  try {
    /*var date = new Date();
    var timeString = date.toLocaleTimeString("en-US", {hour12: false});
    var formattedDate1 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    if (req.query.query_time != null) {
      console.log(req.query.query_time)
      var hours = req.query.query_time  //5,30,60,360,720  come from server as parameter
      var date=new Date()
      var newdate = date.setTime(date.getTime() - hours * 60 * 1000)
      var date = new Date(newdate);
      var timeString = date.toLocaleTimeString("en-US", { hour12: false });
      var formattedDate2 = timeString + "." + ("000" + date.getMilliseconds()).slice(-3) + "+0500";
    }
    else { formattedDate1 = formattedDate2 = ''; }*/
    const matchStage = {};
    if (req.query.query_date1 && req.query.query_date2) {
      matchStage.date = { $gte: req.query.query_date1 ,$lte: req.query.query_date2 };
    } else if (req.query.query_date1) {
      matchStage.date = req.query.query_date1;
    } else if (req.query.query_date2) {

      matchStage.date =req.query.query_date2;
    }
    const groupStage1 = {
      $group: {
        _id: { date: "$date", agent: "$recievedAlert.agent.id" },
        count: { $sum: 1 }
      }}
      const groupStage2={$group: {
        _id: "$_id.date",
        data: {
          $push: {
            Agent: "$_id.agent",
            
            count: "$count"
          }
        }
      }}
      const projectStage = {
        $project: {
          date: "$_id.date",
          Level: "$Agent",
         
          count: "$count"
        }
      };
      
      const unwindStage = {
        $unwind: "$data"
      };
      
      const replaceRootStage = {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              "$data"
            ]
          }
        }
      };
    const pipeline = [
      { $match: matchStage },
      groupStage1,
      groupStage2,
      unwindStage,
      replaceRootStage,
      projectStage,
    ];
    const docs = await Alert.aggregate(pipeline);
    res.status(200).json(docs);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

export default router;
