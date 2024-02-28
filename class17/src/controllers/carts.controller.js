import { Router } from "express";
import cartsService from "../services/carts.service.js";

const router = Router();

/** Add Cart */
router.post("/carts/", async (req, res) => {
  const cartData = req.body;

  try {
    const createdCart = await cartsService.createCart(cartData);

    if (createdCart) {
      res.status(200).send(createdCart);
    }
  } catch (e) {
    res.status(400).send({ error: e, description: e });
  }
});

/** Get products by Cart Id */
router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const productsFromCart = await cartsService.getProductsByCartId(cartId);

    if (productsFromCart) {
      res.status(200).send(productsFromCart);
    } else {
      res.status(200).send([]);
    }
  } catch (e) {
    res.status(400).send({ error: e, description: "Endpoint: GET cart/:cid" });
  }
});

/** UPDATE products by Cart Id */
router.put("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const products = await cartsService.updateProductsByCartId(cartId, req.body); // TODO: crear e implementar servicio

    if (products) {
      res.status(200).send(products);
    } else {
      res.status(200).send([]);
    }
  } catch (e) {
    res.status(400).send({ error: e, description: "Endpoint: GET cart/:cid" });
  }
});


/** ADD a Product by Cart Id */
router.post("/carts/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  try {
    const updatedCart = await cartsService.addProductByCartId(cid, pid);

    if (updatedCart) {
      res.status(200).send(updatedCart);
    }
  } catch (e) {
    res
      .status(400)
      .send({ error: e, description: "Endpoint: POST /:cid/product/:pid" });
  }
});

/** UPDATE a Product Stock (only) by Cart Id */
router.put("/carts/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const { stock } = req.body;

  try {
    const updatedCart = await cartsService.updateProductStockByCartId(cid, pid); // TODO- Agregar el servicio

    if (updatedCart) {
      res.status(200).send(updatedCart);
    }
  } catch (e) {
    res
      .status(400)
      .send({ error: e, description: "Endpoint: POST /:cid/product/:pid" });
  }
});

/** DELETE a Product by Cart Id */
router.delete("/carts/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  try {
    const updatedCart = await cartsService.addProductByCartId(cid, pid); // TODO- Agregar el servicio

    if (updatedCart) {
      res.status(200).send(updatedCart);
    }
  } catch (e) {
    res
      .status(400)
      .send({ error: e, description: "Endpoint: POST /:cid/product/:pid" });
  }
});

/** DELETE all Products by Cart Id */
router.delete("/carts/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);

  try {
    const updatedCart = await cartsService.clearCart(cid); // TODO- Agregar el servicio

    if (updatedCart) {
      res.status(200).send(updatedCart);
    }
  } catch (e) {
    res
      .status(400)
      .send({ error: e, description: "Endpoint: DELETE /:cid" });
  }
});

export default router;
