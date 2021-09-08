const express = require("express");
const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient } = require("mongodb");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.json())
app.use(cors())
const client = new MongoClient(process.env.MONGOID);
const port = process.env.PORT || 4000;

require('./Routes/routes')(app,client,io);



server.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});