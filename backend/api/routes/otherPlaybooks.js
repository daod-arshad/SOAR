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
router.get("/findOne",(req,res)=>{
  const id = req.query.id;
  console.log(id);
  OtherPlaybooksUpdated.findOne({ id:id })
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