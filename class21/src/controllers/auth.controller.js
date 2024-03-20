import { Router } from "express";

import { authentication, privateAccess } from "../middelwares/index.js";
import { Users } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/crypt-password.util.js";
import passport from "passport";

const authRouter = Router();

authRouter.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/auth/fail-login" }),
  async (req, res) => {
    try {
      const { user } = req;

      req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

      //res.redirect("/views/profile"); // for test only
      res.redirect("/views/realtimeproducts");
    } catch (error) {
      console.error("auth error: ", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

authRouter.get("/fail-login", (req, res) => {
  console.log("Login failed.");
  res.status(500).json({ status: "error", error: "Bad request." });
});

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  (req, res) => {}
);

authRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/auth/login" }),
  (req, res) => {
    req.session.user = req.user;
    console.log("🚀 ~ req.session.user:", req.session.user)
    res.redirect("/views/profile");
  }
);

authRouter.get("/users", authentication, privateAccess, (req, res) => {
  res.json({
    messages: users,
  });
});

authRouter.get("/profile", privateAccess, async (req, res) => {
  const session = JSON.parse(req.signedCookies.session);
  console.log("session: ", session);

  const user = users.find((user) => {
    return user.id === session.id;
  });

  res.json({
    messages: user.name,
  });
});

authRouter.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.json({ error: err });

    res.redirect("/views/login");
  });
});

authRouter.patch("/forgot-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) res.status(401).json({ error: "Unauthorized" });

    const passwordEncrypted = createHash(password);

    await Users.updateOne({ email }, { password: passwordEncrypted });

    //res.status(200).json({status: 'Success', message: 'Password was updated.'})
    res.redirect("/views/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

export default authRouter;
