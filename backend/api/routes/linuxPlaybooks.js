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

router.get("/findOne",(req,res)=>{
  const id = req.query.id;
  console.log(id);
  

  LinuxPlaybooksUpdated.findOne({id: id })
    .then((result) => {
      const exists = !!result; // Convert the result to a boolean value
      res.json({ exists });
    })
    .catch((error) => {
      console.error('Error occurred while checking uniqueness:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
export default router