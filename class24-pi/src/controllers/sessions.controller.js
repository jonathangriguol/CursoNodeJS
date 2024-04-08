import { Router } from "express";
import passport from "passport";
import { Users } from "../models/user.model.js";
import { passportCall } from "../utils/passport-call.util.js";

const sessionsController = Router();

sessionsController.get(
  "/current",
  passportCall("current"), // factory middelware
  async (req, res) => {
    try {
      const { user } = req;
      console.log("🚀 ~ usersRouter.get ~ req:", req.user);

      res.status(200).json({
        status: "success",
        payload: user,
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

export default sessionsController;
