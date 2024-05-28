import { Router } from "express";
import passport from "passport";
import { Users } from "../models/user.model.js";
import { passportCall } from "../utils/passport-call.util.js";
import { authorization } from "../middelwares/authorization.middelware.js";
import { addLogger } from "../utils/logger.utils.js";

const usersRouter = Router();
usersRouter.use(addLogger);

usersRouter.post(
  "/",
  passport.authenticate("register", { failureRedirect: "users/fail-register" }),
  async (req, res) => {
    try {
      res
        .status(201)
        .json({ status: "success", message: "User created successfully" });
    } catch (error) {
      console.error("auth error: ", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

usersRouter.get("/fail-register", (req, res) => {
  console.log("User registry failed.");
  res.status(400).json({ status: "error", error: "Bad request." });
});

usersRouter.get(
  "/",
  passportCall("jwt"), // factory middelware
  authorization('user'),
  async (req, res) => {
    
    try {
      console.log("🚀 ~ usersRouter.get ~ req:", req.user);

      const users = await Users.find();

      res.status(200).json({
        status: "success",
        payload: users,
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
);

export default usersRouter;
