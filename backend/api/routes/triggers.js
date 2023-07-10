import express from "express";
import triggerSchema from "../schema/triggerSchema.js";



const router = express.Router()
const now = Date()
router.post("/save", (req, res) => {
    const Trigger = req.body
    console.log(req.body.ruleId)
    triggerSchema.create(Trigger, async(err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
})

router.get("/find", (req, res) => {
  triggerSchema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
router.get("/all",async (req,res)=>{
  try{
  const result = await triggerSchema.aggregate([
    { $project: { _id: 0,date: 1, time: 1,ruleId: 1,isEnabled: 1
     ,node: {
      $map: {
        input: { $slice: ['$nodes', 1, { $subtract: [{ $size: '$nodes' }, 1] }] },
        as: 'node',
        in: '$$node.name'
      }}
    }}]);

    res.json(result);
  }
  catch (error) {
  console.error('Error occurred while fetching playbooks:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/delete',async (req,res)=>{
  const rec=req.query._id;
  console.log(rec)
  try {
    await triggerSchema.deleteOne({ ruleId:rec});
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

router.get("/findOne",(req,res)=>{
  const  ruleId  = req.query.id;
  const id=parseInt(ruleId);
  triggerSchema.findOne({"ruleId" :id})
    .then((result) => {
      const exists = !!result; 
      res.json({ exists });
    })
    .catch((error) => {
      console.error('Error occurred while checking uniqueness:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
export default router