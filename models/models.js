/*
Group Assignment 3
Filename:model.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
 */


const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    firstname:{
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        default:null
    },
    token:{type:String}

});

module.exports = mongoose.model("user", Schema);