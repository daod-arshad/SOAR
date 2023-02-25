import express from "express"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import bcrypt from "bcrypt"
import User from "../schema/user.js"
const jwt = require('jsonwebtoken');
import requireJwtAuth from "../middleware/check-auth.js"
const router = express.Router()
const saltRounds = 10
const maxAge = 30 * 60;
const jwtSecret = ",7q'21681B-F>-#";

router.post("/playbook" , requireJwtAuth, (req, res) => {
            res.json({message: 'welcome to playbook page'})    
})

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
                    
                    const payload = {
                        username: user[0].username,
                        usertype: user[0].usertype,
                        fullname: user[0].fullname,
                        email: user[0].email,
                        designation: user[0].designation
                      };

                     
                      const token = jwt.sign(payload,
                        jwtSecret, 
                        {expiresIn: 2*60}
                        );
                            
           
                    //console.log((token))
                    res.status(200).send(token)
                }
            })
        })
        .catch(err => {
        res.status(500).send(err)
    })
})






export default router