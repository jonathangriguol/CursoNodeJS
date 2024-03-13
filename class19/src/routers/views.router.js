import express from "express";
import { authentication } from "../middelwares/index.js";

const viewsRouter = express.Router();

viewsRouter.get("/home", (req, res) => {
  res.render("home.handlebars", {});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  const defaultLimit = 3;
  const defaultSort = "asc";

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
      //console.log(data);
      res.render("realtimeproducts.handlebars", {
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
      });
    })
    .catch((error) => {
      console.error("Error al cargar el listado:", error);
    });
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

viewsRouter.get("/profile", (req, res) => {
  const { user } = req.session;
  
  res.render("profile.handlebars", {user});
});

export default viewsRouter;
