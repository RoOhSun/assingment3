/*
 * Filename: bookmodels.js
 * Sanket Parab - 2200555449 
 * Saumya Maurya - 200553573
 * Ruchit Suhagia – 200554055
 * Tanveer Singh - 200554065
 * Date: 12 Oct 2023
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