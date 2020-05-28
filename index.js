const express = require('express');
const dotenv = require('dotenv');
const massive = require('massive');
const products_controller = require('./products_controller');
dotenv.config()

const server = express()

server.use(express.json());

const port = process.env.SERVER_PORT;
const connectionString = process.env.CONNECTION_STRING
massive({connectionString,ssl: {rejectUnauthorized: false}})
    .then(dbInstance => {server.set('db', dbInstance);})
    .catch(err => console.log(err));


server.post('/api/products', products_controller.create);
server.get('/api/products', products_controller.getAll);
server.get('/api/products/:id', products_controller.getOne);
server.put('/api/products/:id', products_controller.update);
server.delete('/api/products/:id', products_controller.delete);
    

server.listen(port, ()=>{
    console.log("Server listening at port: "+port);
})