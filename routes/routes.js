/*
Group Assignment 3
Filename:routes.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
 */

require("dotenv").config();
require("../database/db").connect();
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/models");
const auth = require("../middleware/auth")
const app = express();
app.use(express.json());

const bookController = require('../controller/controllers');

//register
app.post("/register",async(req,res)=>{

    try{
        const{firstname,lastname,email,password} = req.body;
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
        if(!(email.length > 0 && password.length > 0 && lastname.length > 0 && firstname.length > 0)){
            res.status(400).json({error : "All fields are required"})
        }
        const CheckUser = await User.findOne({email});
        if(CheckUser){
            return res.json({user : "user is already registered"})
        }
        encryptedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign({
            user_id:user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "15m"
            }
        );

        //save token in db
        user.token = token;
        res.status(201).json(user);
    }

    catch(err){
        console.log(err);
    }

});

//login
app.post("/login", async(req,res)=>{
    
    try{
        const{email,password} = req.body;
        if(!(email && password)){
            res.status(400).send("Dont keep the fields blanks")
        }
        const user = await User.findOne({email});

        if(user && (bcrypt.compareSync(password, user.password))){
            //create a token
            const token = jwt.sign({
                user_id:user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "15m"
                }
            );

            user.token = token;
            res.status(201).json(user)
        }
        else {
            // Invalid credentials
            res.status(401).json({error : 'Invalid password or email'});
        }

    }
    catch(err){
        console.log(err);
    }

})

app.post("/welcome", auth, (req,res)=>{
    res.send("successfully completed Jwt Authentication welcome to home")
})

// get books detail
app.get('/book', auth, bookController.getAllBooks);

// get particular book detail 
app.get('/book/:id', auth, bookController.getBookById);

// Add new book 
app.post('/book', auth, bookController.addNewBook);

// update the old book detail
app.put('/book/:id', auth, bookController.updateBook);

// delete an existing book
app.delete('/book/:id', auth, bookController.deleteBook);


module.exports = app;