import express from "express"
import bcrypt from "bcrypt"
import User from "../schema/user.js"
import jwt from "jsonwebtoken"

const router = express.Router()
const saltRounds = 10

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).send(err)
        }
        else {
            const user = User({
                username: req.body.username,
                password: hash,
                usertype: req.body.usertype,
                fullname: req.body.fullname,
                email: req.body.email,
                designation: req.body.designation
            })
            user.save().then(
                result => {
                    res.status(200).send(result)
                }
            )
                .catch(err => {
                res.status(500).send(err)
            })
        }
    })
})

router.post("/login", (req, res) => {
    User.find({
        username: req.body.username
    }).exec()
        .then(user => {
            if (user.length < 1) {
            res.status(401).send("User not Found")
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    res.status(401).send("Password Failed to match")
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        usertype: user[0].usertype,
                        fullname: user[0].fullname,
                        email: user[0].email,
                        designation: user[0].designation
                    },
                        "this is dummy text",
                        {
                            expiresIn: "24h"
                        }
                    )
                    res.status(200).send(token)
                }
            })
        })
        .catch(err => {
        res.status(500).send(err)
    })
})

export default router