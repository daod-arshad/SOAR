import jwt from "jsonwebtoken"
// import User from "../schema/user.js";

export default (req, res, next ) => {
    //const token = req?.headers?.authorization?. split(" ")[1]
    const token = req.header('x-auth-token');
    
    console.log(token)
    //. split(" ")[1]
    jwt.verify(token,"this is dummy text",(err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            
            console.log('ERROR: Could not connect to the protected route');
            res.redirect('/')
            //res.sendStatus(403);
            
        } else {
            //If token is successfully verified, we can send the autorized data 
            
            // res.json({
            //     message: 'Successful log in',
            //     authorizedData
            // });
            console.log('SUCCESS: Connected to protected route');
            next();
            
        }
    })
    
    // const {token} = req.body;
    // console.log(token)
    // try {
    //     token = req.headers.authorization.split(" ")[1]
    //     const verify = jwt.verify(token, "this is dummy text");
    //     console.log(verify);
    //     next()
    // } catch (err) {
    //     return res.status(401).send("Invalid Token")
    // }


}