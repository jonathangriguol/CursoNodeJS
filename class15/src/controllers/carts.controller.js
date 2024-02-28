import { Router } from "express";
import cartsService from "../services/carts.service.js";

const router = Router();

/** Add Cart */
router.post("/carts/", async (req, res) => {
  const { products } = req.body;

  try {
    const createdCart = await cartsService.createCart(products);

    if (createdCart) {
      res.status(200).send(createdCart);
    }
  } catch (e) {
    res.status(400).send({ error: e, description: "Endpoint: POST cart/" });
  }
});

/** Get products by Cart Id */
router.get("/carts/:cid", async (req, res) => {
  const cartId = parseInt(req.params.cid);

  try {
    const products =  await cartsService.getProductsByCartId(cartId);

    if (products) {
      res.status(200).send(products);
    } else {
		res.status(200).send([]);
	}
  } catch (e) {
    res.status(400).send({ error: e, description: "Endpoint: GET cart/:cid" });
  }
});

/** Add product by Cart Id */
router.post("/carts/:cid/product/:pid", async (req, res) => {
	const cid = parseInt(req.params.cid);
	const pid = parseInt(req.params.pid);
  
	try {
	  const updatedCart = await cartsService.addProductByCartId(cid, pid);
  
	  if (updatedCart) {
		res.status(200).send(updatedCart);
	  }
	} catch (e) {
	  res.status(400).send({ error: e, description: "Endpoint: POST /:cid/product/:pid" });
	}
  });

export default router;
