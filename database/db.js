/*
Group Assignment 4
Filename:db.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
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