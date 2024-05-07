import { Router } from "express";
import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";
import ticketsService from "../services/tickets.service.js";

const router = Router();

/** Add Cart */
router.post("/carts/", async (req, res) => {
  const cartData = req.body;

  try {
    const createdCart = await cartsService.create(cartData);

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
    const products = await cartsService.updateProductsByCartId(
      cartId,
      req.body
    ); // TODO: crear e implementar servicio

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
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const updatedCart = await cartsService.addProductByCartId(pid, cid);

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
    res.status(400).send({ error: e, description: "Endpoint: DELETE /:cid" });
  }
});

/** GET a purchase by Cart Id */
router.get("/carts/:cid/purchase", async (req, res) => {
  let purchaseComplete = []; //array para los productos procesados correctamente
  let purchaseError = []; //array para los productos que no pudieron procesarse por falta de stock
  let totalPrice = 0;

  const cid = req.params.cid;
  const cart = await cartsService.getProductsByCartId({ _id: cid });

  const productsInCart = cart.products;

  try {
    for (let obj of productsInCart) {
      const pid = obj.product._id.toString();
      const quantity = obj.quantity;
      const productInDb = await productsService.getById({ _id: pid });

      if (quantity > productInDb.stock) {
        // verificamos que la cantidad comprada no sea mayor a nuestro stock
        purchaseError.push(obj.product); // Agregamos el producto al array de los que NO pudieron procesarse por falta de stock.
      }

      if (quantity <= productInDb.stock) {
        // La cantidad a comprar es menor al stock. Procede la compra
        let productUpdate = productInDb;
        const stockUpdated = productInDb.stock - quantity;
        productUpdate.stock = stockUpdated; // re calculo el stock

        await productsService.updateOne({ _id: pid }, productUpdate); // Actualizamos el stock del producto

        purchaseComplete.push(obj.product); // agreamos el producto al array para proceder con la compra.
        const amount = productInDb.price * quantity;
        totalPrice += amount;
      }
    }

    //Eliminamos los productos que se procesaron correctamente del carrito, e insertamos el array de productos no procesados:
    const notPurchasedProductsInCart =
      await cartsService.addProductsByCartId({ _id: cid }, purchaseError);

    // Creamos el ticket
    if (purchaseComplete.length > 0) {
      //definimos los datos que necesitamos para el ticket:
      const ticketData = {
        amount: totalPrice,
        purchaser: req?.user?.email ?? '',
      };

      //creamos el ticket en la base de datos:
      const ticket = await ticketsService.addTicket(ticketData);

      //agregamos informacion adicional, los productos que se procesaron correctamente y los que no:
      const purchaseData = {
        ticket: ticket,
        processedProducts: purchaseComplete,
        unprocessedProducts: purchaseError,
      };

      res.status(200).send({ status: "success", payload: purchaseData });
    } else {
      // Si no hay productos en purchaseComplete, devolvemos los productos en purchaseError
      res.status(200).send({
        status: "success",
        message: "No se procesaron productos, por falta de stock.",
        payload: { unprocessedProducts: purchaseError },
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
