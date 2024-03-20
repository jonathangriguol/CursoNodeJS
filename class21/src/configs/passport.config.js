import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import { Users } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/crypt-password.util.js";
import githubConfig from "./keys.config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email } = req.body;

          const user = await Users.findOne({ email: username });

          if (user) {
            return done(null, false);
          }

          const newUserInfo = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };

          const newUser = await Users.create(newUserInfo);

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await Users.findOne({ email: username });

          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: githubConfig.clientId,
        clientSecret: githubConfig.clientSecret,
        callbackURL: "http://localhost:8080/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, login, name, email } = profile._json;
          console.log("🚀 ~ profile._json:", profile._json)

          const user = await Users.findOne({ email });

          if (!user) {
            const newUserInfo = {
              first_name: name || login,
              email,
              githubId: id,
              githubUsername: login,
            };

            const newUser = Users.create(newUserInfo);
            return done(null, newUser);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id);

        done(null, user);
    } catch (error) {
        done(error);
    }
  });
};

export default initializePassport;
