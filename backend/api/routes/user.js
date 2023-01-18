import express from "express"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import bcrypt from "bcrypt"
import User from "../schema/user.js"
import jwt from "jsonwebtoken"
// const {checkUser} = require("../api/middleware/check-auth");
import checkAuth from "../middleware/check-auth.js"

var CryptoJS = require("crypto-js");
const router = express.Router()
const saltRounds = 10
const maxAge = 30 * 60;

router.post("/playbook", checkAuth , (req,res)=>{
 //create
 res.json({message: 'welcome to playbook page'})
})

router.post("/signup", checkAuth,(req, res) => {
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
                            expiresIn: maxAge
                        }
                    )
                    res.cookie("jwt",token,{
                        withCredentials: true,
                        httpOnly: false,
                        maxAge: maxAge * 1000
                    })
                   
                    //res.status(200).json({success:true});
                    // var bytes  = CryptoJS.AES.decrypt(token, 'secret key 123');
                    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    // console.log("data: "+ decryptedData);
                    // // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(token), 'secret key 123').toString();
                    // // console.log(ciphertext)
                    
                    
                    res.status(200).send(token)
                }
            })
        })
        .catch(err => {
        res.status(500).send(err)
    })
})






export default router