/*
 * Filename: auth.js
 * Sanket Parab - 2200555449 
 * Saumya Maurya - 200553573
 * Ruchit Suhagia – 200554055
 * Tanveer Singh - 200554065
 * Date: 12 Oct 2023
 */

const jwt = require("jsonwebtoken");
const routes = require("../routes/routes")


const verifyToken = (req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(499).send("Authentication Token Required")
    }
    try{
        const decodeToken = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decodeToken;

    }
    catch(err){
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;