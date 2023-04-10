import express from "express";

const router = express.Router()

router.post("/save", (req, res) => {
    console.log(req.body.playbooks)
})

export default router