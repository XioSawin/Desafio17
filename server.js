const { Socket } = require('dgram');
const { sqlite3Connect } = require('./DB/sqlite3.db');

const express = require("express");
const app = require('express')();
// const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const knex = require('knex')(sqlite3Connect);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Config 
app.set("views", "./views");
app.set("view engine", "ejs");

// Lista de productos
const productos = [
    {
        id: 1,
        title: 'Calculadora',
        price: 430,
        thumbnail: 'aa'
    }
]; 

// Lista de mensajes

const messages = [
    {
        email: 'xsawin@gmail.com',
        timestamp: '28/2/2021 10:15:22',
        message: 'Hola!'
    }
]

// add messages to db

knex('messages').insert(messages)
    .then(() => console.log('mensajes ingresados'))
    .catch((err) => console.log(err))

// Rutas

app.get('/', (req, res) => {
    res.render('pages/index', {productos: productos})
})

// Connection Socket.io

io.on('connection', (socket) => {
    socket.broadcast.emit('mensaje-user', 'Hola mundo');

    // emit
    socket.emit('products', productos);
    socket.emit('messages', messages);

    // products
    socket.on('new-product', function(data){
        let myID = (productos.length)+1;

        let myTitle = data.title;
        let myPrice = data.price;
        let myThumbnail = data.thumbnail;

        const producto = {
            id: myID, 
            title: myTitle, 
            price: myPrice, 
            thumbnail: myThumbnail
        }

        productos.push(producto);

        io.sockets.emit('products', productos);
    })

    // message-center

    socket.on('new-message', function(data) {
        messages.push(data);

        knex('messages').insert(data)
            .then(() => console.log('mensajes ingresados'))
            .catch((err) => console.log(err))

        io.sockets.emit('messages', messages);
    });

})

http.listen(3030, () => {
    console.log('Driving-driving on port 3030');
})