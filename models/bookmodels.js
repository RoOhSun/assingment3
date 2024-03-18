/*
 * Filename: bookmodels.js
 * Sanket Parab - 2200555449 
 * Saumya Maurya - 200553573
 * Ruchit Suhagia – 200554055
 * Tanveer Singh - 200554065
 * Date: 12 Oct 2023
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
    unique: true,
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

module.exports = mongoose.model('Book', BookSchema);