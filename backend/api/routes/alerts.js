import express from "express"
import alertSchema from "../schema/alertSchema.js";

const router=express.Router();

router.post('/sa',async(req,res)=>{
var record=alertSchema({
    date: req.body.date,
    time:req.body.time,
    os:req.body.os,
    recievedAlert: req.body.alert,

})

record.save().then(result=>{
    res.status(200).send(result)
})
.catch(err=>{res.status(500).send(err)})


});
export default router
