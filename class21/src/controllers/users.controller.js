import { Router } from "express";
import { authentication, privateAccess } from "../middelwares/index.js";
import passport from "passport";

const usersRouter = Router();

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

usersRouter.get("/users", authentication, privateAccess, (req, res) => {
  res.json({
    messages: users,
  });
});

usersRouter.get("/profile", privateAccess, async (req, res) => {
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
