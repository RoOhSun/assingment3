/*
Group Assignment 4
Filename:bookmodels.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  BooksName: { 
    type: String, 
    required: true, 
},
  ISBN: { 
    type: String,
    required: true,  
},
  Rating: { 
    type: Number, 
    required: true, 
},
  Author: { 
    type: String, 
    required: true, 
},
  Genre: { 
    type: String, 
    required: true, 
},
created_date:{
    type:Date,
    default: Date.now
}
}, { bufferCommands: false });

module.exports = mongoose.model('booklist', BookSchema);