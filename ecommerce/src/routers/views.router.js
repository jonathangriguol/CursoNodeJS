import express from "express";
import { passportCall } from "../utils/passport-call.util.js";
import { applyPolicy } from "../middelwares/authentication.middelware.js";
import { privateAccess } from "../middelwares/authorization.middelware.js";
import { purchaseView } from "../controllers/views.controller.js";
import { Cart } from "../models/cart.model.js";
import { Users } from "../models/user.model.js";
import { addLogger } from "../utils/logger.utils.js";

const viewsRouter = express.Router();
viewsRouter.use(addLogger);

viewsRouter.get("/home", (req, res) => {
  res.render("home.handlebars", {});
});

viewsRouter.get("/realtimeproducts", passportCall("jwt"), async (req, res) => {
  const defaultLimit = 3;
  const defaultSort = "asc";

  console.log("🚀 ~ viewsRouter.get ~ req.user:", req.user);

  const userId = req.user?._id;

  const user = await Users.findById(userId).lean();

  const { page = 1 } = req.query;
  const limit = (req.body.limit ?? req.query.limit) || defaultLimit;

  const sort = req.query.sort || "price"; // Campo por el cual ordenar
  const order = req.query.order || "asc"; // asc | desc

  const queryStr = `?page=${page}&limit=${limit}`;

  fetch(
    `http://localhost:8080/api/products/${queryStr}&sort=${sort}&order=${order}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      res.render("realtimeproducts.handlebars", {
        cartId: user.cart[0]._id.toString(),
        productsData: data,
        limit,
        sort,
        order,
      });
    })
    .catch((error) => {
      console.error("Error al cargar el listado:", error);
    });
});

viewsRouter.get("/carts/:cid", (req, res) => {
  const cartId = req.params.cid;

  fetch(`http://localhost:8080/api/carts/${cartId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.render("cart.handlebars", {
        productsData: data,
        cartId,
      });
    })
    .catch((error) => {
      console.error("Error al cargar el listado:", error);
    });
});

viewsRouter.get(
  "/carts/:cid/purchase",
  passportCall("jwt"),
  applyPolicy(["USER", "ADMIN"]),
  privateAccess,
  purchaseView
);

viewsRouter.get("/checkout", (req, res) => {
  const checkout = {
    ticket: {
      amount: 800,
      purchaser: "",
      _id: "6656832746eb1a001716abcc",
      code: "98445d41-1bf6-48b3-980b-6158a6457d22",
      purchase_datetime: "2024-05-29T01:21:43.993Z",
      __v: 0,
    },
    processedProducts: [
      {
        _id: "65d690bdf279a745cff66a99",
        code: "A01",
        title: "Playstation",
        description: "consola",
        price: 800,
        thumbnails: ["uno.jpg"],
        stock: 8,
        category: "gaming",
        status: true,
        __v: 0,
      },
    ],
  };

  req.logger.info(`Checkout: ${checkout}`);

  res.render('checkout-cart.handlebars', { purchase: checkout });
});

viewsRouter.get("/chat", (req, res) => {
  res.render("chat.handlebars", {});
});

viewsRouter.get("/login", (req, res) => {
  res.render("login.handlebars");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("signup.handlebars");
});

viewsRouter.get("/forgot", (req, res) => {
  res.render("forgot-password.handlebars");
});

viewsRouter.get("/reset-password", (req, res) => {
  res.render("reset-password.handlebars");
});

viewsRouter.get(
  "/profile",
  passportCall("jwt"),
  applyPolicy(["USER", "ADMIN"]),
  (req, res) => {
    const { user } = req;
    res.render("profile.handlebars", { user });
  }
);

export default viewsRouter;
