import express from "express"
import handlebars from 'express-handlebars'
import __dirname from "./utils.js"

import { Server } from "socket.io"

import viewsRouter from "./routers/views.router.js"
import {mongoConnect} from "./db/index.js"
import productsControllerFn from "./controllers/products.controller.js"
import cartsController from "./controllers/carts.controller.js"
import chatsController from "./controllers/chats.controller.js"

const app = express()

mongoConnect()

const httpServer = app.listen(8080, () => {
  console.log("Server started at port: 8080")
});

const io = new Server(httpServer, {
  /* opts */
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('views engine', 'handlebars')

// Seteo carpeta public como raiz de servidor estatico
app.use(express.static(__dirname + "/public"))

// Middelare para parseo de json
app.use(express.json())
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }))

// Utilizo ruta de products para "/api/products"
const productsController = productsControllerFn(io)
app.use("/api", productsController)
// Utilizo ruta de carts para "/api/carts"
app.use("/api", cartsController)
// Utilizo ruta para chats messages
app.use("/api", chatsController)

// utilizo ruta views para las vistas
app.use('/views', viewsRouter)


const chats = []

io.on("connection", (socket) => {
  console.log('Nuevo cliente socket conectado...!');

  socket.on('newUser', (data) => {
    socket.broadcast.emit('userConnected', data);
  });

  socket.on('initChat', (data) => {
    chats.length = 0
    chats.push(...data)
    io.emit('messageLogs', chats);
  });

  socket.on('message', (data) => {
    chats.push(data)
    io.emit('messageLogs', chats);
  });
});
