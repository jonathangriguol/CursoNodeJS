import { Router } from "express";

import { authentication, authorization } from "../middelwares/index.js";
import { Users } from "../models/user.model.js";

const authRouter = Router();

authRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) res.status(400).json({ error: "Bad request" });

    if (user.password !== password)
      res.status(400).json({ error: "Bad request" });

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    //res.redirect("/views/profile"); // for test only
    res.redirect('/views/realtimeproducts')
  } catch (error) {
    console.error("auth error: ", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

authRouter.get("/users", authentication, authorization, (req, res) => {
  res.json({
    messages: users,
  });
});

authRouter.get("/profile", async (req, res) => {
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
  console.log("Entre al logout");
  req.session.destroy((err) => {
    if (err) return res.json({ error: err });

    res.redirect("/views/login");
  });
});

export default authRouter;
