import { Router } from "express";
import { generateProduct } from "../utils/mocks.utils.js";
import { addLogger } from "../utils/logger.utils.js";

const router = Router();

router.use(addLogger);

router.get("/products", async (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  res.send({ status: "success", payload: products });
});

export default router;