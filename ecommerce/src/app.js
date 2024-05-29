import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import viewsRouter from "./routers/views.router.js";
import { mongoConnect } from "./db/index.js";
import productsControllerFn from "./controllers/products.controller.js";
import cartsController from "./controllers/carts.controller.js";
import chatsController from "./controllers/chats.controller.js";
import authController from "./controllers/auth.controller.js";
import mockingController from "./controllers/mocking.controller.js"
import usersRouter from "./controllers/users.controller.js";
import initializePassport from "./configs/passport.config.js";
import passport from "passport";
import sessionsController from "./controllers/sessions.controller.js";
import session from "express-session";
import errorHandler from "./middelwares/errors/index.js"
import { addLogger } from "./utils/logger.utils.js";
import loggerController from "./controllers/logger.controller.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import stripeController from "./controllers/stripe.controller.js";

const app = express();

mongoConnect();

/* SWAGGER */
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Documentation',
      description: 'Documentacion de la API para el ecommerce del curso NodeJS de Coderhouse'
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions);

app.use('/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

const io = new Server(httpServer, {
  /* opts */
});

// Registro del helper ifEquals
const hbs = handlebars.create({
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("views engine", "handlebars");

// Seteo carpeta public como raiz de servidor estatico
app.use(express.static(__dirname + "/public"));

// Middelare para parseo de json
app.use(express.json());
app.use(cookieParser("COOKIE-KEY"));

// Implementa Passport
app.use(session({saveUninitialized: false, resave: false, secret:'example'}));
initializePassport();
app.use(passport.initialize());

// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Utilizo ruta de products para "/api/products"
const productsController = productsControllerFn(io);
app.use("/api", productsController);
// Utilizo ruta de carts para "/api/carts"
app.use("/api", cartsController);
// Utilizo ruta para chats messages
app.use("/api", chatsController);
// Utilizo ruta para authenticacion
app.use("/auth", authController);
app.use("/users", usersRouter);
app.use("/sessions", sessionsController);
// Pasarela de pago
app.post("/stripe", stripeController);

// utilizo ruta views para las vistas
app.use("/views", viewsRouter);

// Error handling Middleware 
app.use(errorHandler);

/**
 *  Los siguientes endpoints son para testeo de algunas 
 *  herramientas utilizadas en el curso
 */
// Ruta para logger:
app.get('/loggerTest' , addLogger , loggerController);

// Mocking
app.use("/mocking", mockingController);

app.get("/complexoperation", (req, res) => {
  let sum = 0;
  for(let i = 0; i < 5e8; i++) {
    sum += i;
  }
  res.send({sum});
});

/** Fin testeo de herramientas */

const chats = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente socket conectado...!");

  socket.on("newUser", (data) => {
    socket.broadcast.emit("userConnected", data);
  });

  socket.on("initChat", (data) => {
    chats.length = 0;
    chats.push(...data);
    io.emit("messageLogs", chats);
  });

  socket.on("message", (data) => {
    chats.push(data);
    io.emit("messageLogs", chats);
  });
});
