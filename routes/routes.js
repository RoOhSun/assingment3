/*
 * Filename: routes.js
 * Student's Name: Meet Patel
 * Student ID: 200555977
 * Date: 12 Oct 2023
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
    /*
        1. get user info
        2. validate user info
        3. validate id wheather the user already exists
        4. Encrypt the user password
        5. Creatte a user in mongoose
        6. Create a signed jwt token
    */

    try{
        //1
        const{firstname,lastname,email,password} = req.body;

        //2
        if(!(email && password && lastname && firstname)){
            res.status(400).json({error : "All fields are required"})
        }

        //3
        const CheckUser = await User.findOne({email});
        if(CheckUser){
            return res.json({user : "user is already registered"})
        }
        //4
        encryptedPassword = await bcrypt.hash(password, 12)

        //5
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //6
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
     /*
        1. get user info
        2. validate user info
        3. validate id wheather the user already exists
        4. validate the user password with the password in database
        6. Create a signed jwt token
    */

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


//welcome
app.post("/welcome", auth, (req,res)=>{
    res.send("successfully completed Jwt Authentication welcome to home")
})

// get all the books detail
app.get('/book', auth, bookController.getAllBooks);

// get particular book detail 
app.get('/book/:id', auth, bookController.getBookById);

// Add new book 
app.post('/book', auth, bookController.addNewBook);

// update the existing book detail
app.put('/book/:id', auth, bookController.updateBook);

// delete an existing book
app.delete('/book/:id', auth, bookController.deleteBook);


module.exports = app;