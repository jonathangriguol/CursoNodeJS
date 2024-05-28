import { Router } from "express";

import { Users } from "../models/user.model.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { createHash, isValidPassword } from "../utils/crypt-password.util.js";
import passport from "passport";
import { authMiddleware, generateToken } from "../utils/jwt.util.js";
import { messaging } from "../configs/app.config.js";
import { ResetPassword } from "../dao/repository/index.js";
import { addLogger } from "../utils/logger.utils.js";

const authRouter = Router();
authRouter.use(addLogger);

authRouter.post(
  "/",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/auth/fail-login",
  }),
  async (req, res) => {
    try {
      const { user } = req;
      console.log("🚀 ~ user:", user)

      const token = generateToken(user);
      console.log("🚀 ~ token:", token)
      

      res.cookie("authToken", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
      });

      //res.redirect("/views/profile"); // for test only
      req.logger.info(`Login succeed.`);
      res.redirect("/views/realtimeproducts");
    } catch (error) {
      req.logger.error(`Login error: ${error.message}`);
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
    //To Do: enviar user al template
    res.redirect("/views/profile");
  }
);

authRouter.get("/users", authMiddleware, (req, res) => {
  res.json({
    messages: users,
  });
});

authRouter.get("/profile", authMiddleware, async (req, res) => {
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

authRouter.post("/reset-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("🚀 ~ authRouter.post ~ email:", email)

    const user = await Users.findOne({ email });
    console.log("🚀 ~ authRouter.post ~ user:", user)

    

    if (!user) res.status(401).json({ error: "Email doesn't exist." });

    // Función para generar un código aleatorio
    const generateRandomCode = () => {
      return crypto.randomBytes(4).toString("hex");
    };

    const code = generateRandomCode();

    // Guardar el código de recuperación, el modelo de los resetCode esta configurado para que expiren en una hora.
    const newCode = await ResetPassword.saveCode(email, code);

    //enviamos mail de recuperacion de password
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: messaging.EMAIL_USER,
        pass: messaging.EMAIL_PASSWORD,
      },
    });

    try {
      let result = await transport.sendMail({
        from:
          "Coder App - recuperacion de contraseña <" + messaging.EMAIL_USER + ">",
        to: email,
        subject: "Código de recuperación de tu contraseña",
        html: `
              <div>
                  <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:<br><a href="http://localhost:8080/newpassword/${code}">http://localhost:8080/newpassword/${code}</a></p>
                  <p>El código para recuperar tu contraseña es: ${code}<br>Si no fuiste tú quién lo solicitó, ignora este mensaje.</p>
              </div>
              `,
        attachments: [],
      });

    } catch (error) {
      console.log("Error:", error.message);
      return res
        .status(500)
        .json({ message: "Error enviando correo electrónico" });
    }

    // Enviar una respuesta exitosa
    res
      .status(200)
      .json({
        status: "success",
        message: "Código de recuperación enviado exitosamente",
      });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
