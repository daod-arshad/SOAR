import express from "express";
import resultSchema from "../schema/resultsSchema.js";
import LinuxPlaybooksUpdated from "../schema/linuxPlaybooksSchemaUpdated.js";
import OtherPlaybooksUpdated from "../schema/otherPlaybookSchemaUpdated.js";
import WindowsPlaybooksUpdated from "../schema/windowsPlaybookSchemaUpdated.js";



const router = express.Router();

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
      // for (var i = 0; i < data.length; i++){
      //   data[i].data = Buffer.from(data[i].data, "base64").toString("ascii");
      // }
      res.status(201).send(data);
    }
  });
});


router.get('/playbookCount',async(req,res)=>{
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
 
    const groupStage = {
        $group: {
          _id: null,
          noOfPlaybooks: { $sum:"$noOfPlaybooks" },
        }
      };
    const pipeline = [
      { $match: matchStage },
      groupStage,
    ];


    const docs = await resultSchema.aggregate(pipeline);
    const totalCount = docs.length > 0 ? docs[0].noOfPlaybooks : 0;
    console.log(totalCount)
    

    res.status(200).json(totalCount);
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

router.get('/CustomPlaybooks', async (req, res) => {
  try {
    const playbooks = [];

    // Linux Playbooks
    const linuxPlaybooks = await LinuxPlaybooksUpdated.aggregate([
      { $match: { id: /^Cus/ } },
      { $project: { _id: 0,playbook_name: 1, playbook_display_name: 1,playbook_inputs: 1, id: 1  } }
    ]);
    playbooks.push(...linuxPlaybooks);

    // Windows Playbooks
    const windowsPlaybooks = await WindowsPlaybooksUpdated.aggregate([
      { $match: { id: /^Cus/ } },
      { $project: { _id: 0,playbook_name: 1, playbook_display_name: 1,playbook_inputs: 1, id: 1 } }
    ]);
    playbooks.push(...windowsPlaybooks);

    // Other Playbooks
    const otherPlaybooks = await OtherPlaybooksUpdated.aggregate([
      { $match: { id: /^Cus/ } },
      { $project: { _id: 0,playbook_name: 1, playbook_display_name: 1,playbook_inputs: 1, id: 1  } }
    ]);
    playbooks.push(...otherPlaybooks);
    console.log(playbooks)
    res.json(playbooks);
  } catch (error) {
    console.error('Error occurred while fetching playbooks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteCustomPlaybook',async (req,res)=>{
  const id=req.query.id;
  console.log(id)
 
  try {
    
    let collection;
    if (id.startsWith('CusLin')) {
      collection = LinuxPlaybooksUpdated;
    } else if (id.startsWith('CusWin')) {
      collection = WindowsPlaybooksUpdated;
    } else if (id.startsWith('CusOther')){
      collection = OtherPlaybooksUpdated;
    }

    await collection.deleteOne({ id });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
});
  

export default router;
