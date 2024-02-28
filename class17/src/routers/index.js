import cartsController from "../controllers/carts.controller";
import chatsController from "../controllers/chats.controller";
import productsController from "../controllers/products.controller";

export const router = (app) => {
  app.use("products", productsController);
  app.use("carts", cartsController);
  app.use("chats", chatsController);
};
