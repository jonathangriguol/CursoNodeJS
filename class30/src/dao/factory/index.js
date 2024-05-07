import { environment } from "../../configs/app.config.js";
import MongoCartDao from "../mongo/cart.dao.js";
import MongoProductDao from "../mongo/product.dao.js";
import MongoResetPasswordDao from "../mongo/resetPassword.dao.js";
import MongoTicketDao from "../mongo/ticket.dao.js";
import MongoUserDao from "../mongo/user.dao.js";

let ProductFactory;
let CartFactory;
let TicketFactory;
let UserFactory;
let ResetPasswordFactory;

switch (environment) {
  /* Voy a utilizar los mismos DAO para ambos casos, pero podria utilizar
    Memory DAO para dev */
  case "dev":
  case "prod":
    ProductFactory = MongoProductDao;
    CartFactory = MongoCartDao;
    TicketFactory = MongoTicketDao;
    UserFactory = MongoUserDao;
    ResetPasswordFactory = MongoResetPasswordDao
    break;
  default:
    break;
}

export { ProductFactory, CartFactory, TicketFactory, UserFactory, ResetPasswordFactory };
