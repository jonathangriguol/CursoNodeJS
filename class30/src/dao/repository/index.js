
import { CartFactory, ProductFactory, ResetPasswordFactory, TicketFactory, UserFactory } from "../factory/index.js";
import CartRepository from "./carts.repository.js";
import ProductRepository from "./products.repository.js";
import ResetPasswordRepository from "./resetPassword.repository.js";
import TicketRepository from "./tickets.repository.js";
import UserRepository from "./users.repository.js";


export const Product = new ProductRepository(new ProductFactory());
export const Cart = new CartRepository(new CartFactory());
export const Ticket = new TicketRepository(new TicketFactory());
export const User = new UserRepository(new UserFactory());
export const ResetPassword = new ResetPasswordRepository(new ResetPasswordFactory())

