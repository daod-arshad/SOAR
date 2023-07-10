import WindowsPlaybooksUpdated from "../schema/windowsPlaybookSchemaUpdated.js";
import express from "express"
//import checkAuth from "../middleware/check-auth.js"

const router = express.Router()

router.post("/new", (req, res) => {
  const windowsPlaybook = req.body;

  WindowsPlaybooksUpdated.create(windowsPlaybook, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/find", (req, res) => {
  WindowsPlaybooksUpdated.find((err, data) => {
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
  WindowsPlaybooksUpdated.findOne({id:id})
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