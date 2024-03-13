import { Router } from "express";

import { authentication, authorization } from "../middelwares/index.js";
import { Users } from "../models/user.model.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const newUserInfo = {
      first_name,
      last_name,
      email,
      password,
    };

    const user = await Users.create(newUserInfo);

    res.json({ status: "success", message: user });
  } catch (error) {
    console.error("auth error: ", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

usersRouter.get("/users", authentication, authorization, (req, res) => {
  res.json({
    messages: users,
  });
});

usersRouter.get("/profile", async (req, res) => {
  const session = JSON.parse(req.signedCookies.session);
  console.log("session: ", session);

  const user = users.find((user) => {
    return user.id === session.id;
  });

  res.json({
    messages: user.name,
  });
});

export default usersRouter;
