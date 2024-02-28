import { Router } from "express";
import productsService from "../services/products.service.js";

const productsRouter = Router();

// Le digo a la ruta que utilice un middleware que defino yo
productsRouter.use((req, res, next) => {
  // si el type de mascota es Perro
  if (req.body.type === "Perro") {
    // Retorno un error
    res.status(403).send("No Quiero alimañas");
  }
  // Sigo
  next();
});

const productsControllerFn = (io) => {
  productsRouter.get("/products", async (req, res) => {
    const { limit } = req.query;

    try {
      const products = await productsService.getAll(req.query);

      res.send(products);
    } catch (e) {
      res
        .status(400)
        .send({ error: e, description: "Endpoint: GET products/" });
    }
  });

  productsRouter.get("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);

    try {
      //const product = await productManager.getProductByID(pid);

      const product = await productsService.getById({ _id: req.params.pid }); // DON'T PARSE TO int!
      console.log('producto: ', product)
      if (product) {
        res.send(product);
      } else {
        throw new Error(e);
      }
    } catch (e) {
      res
        .status(400)
        .send({ error: e, description: "Endpoint: GET products/" });
    }
  });

  /** Add product */
  productsRouter.post("/products", async (req, res) => {
    const {
      code,
      title,
      description,
      price,
      thumbnails,
      stock,
      category,
      status,
    } = req.body;

    try {
      /* const createdProduct = await productManager.agregarProducto(
        code,
        title,
        description,
        price,
        thumbnails,
        stock,
        category,
        status
      ); */

      const createdProduct = await productsService.insertOne(req.body);

      if (createdProduct) {
        // Obtener el listado actualizado
        /*const productsList = await productManager.getProducts();*/

        const productsList = await productsService.getAll();

        // Emito el evento updateList para actualizar la vista
        io.emit("updateList", productsList);

        res.status(200).send(createdProduct);
      }
    } catch (e) {
      res
        .status(400)
        .send({ error: e, description: "Endpoint: POST products/" });
    }
  });

  /**
   * Updates a Product
   */
  productsRouter.put("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    const {
      code,
      title,
      description,
      price,
      thumbnails,
      stock,
      category,
      status,
    } = req.body;

    try {
      /* const editedProduct = await productManager.editProductById(
        code,
        title,
        description,
        price,
        thumbnails,
        stock,
        category,
        status
      ); */

      const editedProduct = await productsService.updateOne(
        { _id: req.params.pid },
        req.body
      );

      if (editedProduct.code || editedProduct.matchedCount) {
        res.status(200).send(editedProduct);
      } else {
        throw new Error(editedProduct);
      }
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .send({ error: e, description: "Endpoint: PUT products/:pid" });
    }
  });

  /** Deletes a product by id */
  productsRouter.delete("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);

    try {
      /*await productManager.deleteProductByID(pid);*/

      await productsService.deleteOne({ _id: req.params.pid });

      /*const products = await productManager.getProducts();*/

      const products = await productsService.getAll();

      res.status(200).send(products);
    } catch (e) {
      res
        .status(400)
        .send({ error: e, description: "Endpoint: DELETE products/" });
    }
  });

  return productsRouter;
};

export default productsControllerFn;
