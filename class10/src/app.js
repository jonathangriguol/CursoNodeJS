import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import { Server } from "socket.io";

import { cartsRouter } from "./routers/carts.router.js";
import { productsRouterFn } from "./routers/products.router.js";
import viewsRouter from "./routers/views.router.js";

const app = express();

const httpServer = app.listen(8080, () => {
  console.log("Server started at port: 8080");
});

const io = new Server(httpServer, {
  /* opts */
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');

// Seteo carpeta public como raiz de servidor estatico
app.use(express.static(__dirname + "/public"));

// Middelare para parseo de json
app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Utilizo ruta de products para "/api/products"
const productsRouter = productsRouterFn(io);
app.use("/api/products", productsRouter);
// Utilizo ruta de carts para "/api/carts"
app.use("/api/carts", cartsRouter);

// utilizo ruta views para las vistas
app.use('/views', viewsRouter);


io.on("connection", (socket) => {
  console.log('Nuevo cliente socket conectado...!');

  socket.on('message', data => {
    console.log('message ->', data);
  });
});
