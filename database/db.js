/*
 * Filename: db.js
 * Sanket Parab - 2200555449 
 * Saumya Maurya - 200553573
 * Ruchit Suhagia – 200554055
 * Tanveer Singh - 200554065
 * Date: 12 Oct 2023
 */

const mongoose = require("mongoose")
const { MONGO_URI } = process.env;

exports.connect=()=>(
    mongoose.connect(MONGO_URI, {
    })
    .then(()=>{
        console.log("connected to database")
    })
    .catch((error)=>{
        console.log("conection failed")
        console.log(error)
    })
)