/*
Group Assignment 4
Filename:index.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
 */


const http = require("http");
const routes = require("./routes/routes")
const server = http.createServer(routes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})