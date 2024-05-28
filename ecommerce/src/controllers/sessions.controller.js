import { Router } from "express";
import jwt from "jsonwebtoken";
import { passportCall } from "../utils/passport-call.util.js";
import UserSessionDto from "../dao/dto/userSession.dto.js";
import { secrets } from "../configs/keys.config.js";
import { addLogger } from "../utils/logger.utils.js";

const sessionsController = Router();
sessionsController.use(addLogger);

sessionsController.get(
  "/current",
  //passportCall("current"), // factory middelware
  async (req, res) => {
    try {
      const cookie = req.cookies["authToken"];
      console.log(cookie)
      const user = jwt.verify(cookie, secrets.jwt_secret);

      console.log("🚀 ~ sessionsRouter.current ~ cookie:", user);

      if (user)
        return res
          .status(200)
          .send({ status: "success", payload: new UserSessionDto(user) });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
);

export default sessionsController;
