/*
 * Filename: index.js
 * Sanket Parab - 2200555449 
 * Saumya Maurya - 200553573
 * Ruchit Suhagia – 200554055
 * Tanveer Singh - 200554065
 * Date: 12 Oct 2023
 */

const http = require("http");
const routes = require("./routes/routes")
const server = http.createServer(routes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})