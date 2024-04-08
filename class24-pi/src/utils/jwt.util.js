import jwt from "jsonwebtoken";

const secret = "mySecret";

const generateToken = (user) => {

  console.log('generateToken: ', user)
  return jwt.sign(user, secret, { expiresIn: 90 });
};

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(' ')[1];

  if (!authHeaders)
    return res.status(401).json({ status: "error", message: "Unauthorized" });

  jwt.verify(token, secret, (error, credentials) => {
    if (error) res.json({ error });

    const userInfo = {
      id: credentials.id,
      email: credentials.email,
    };

    req.user = userInfo;

    next();
  });
};

export { generateToken, authMiddleware }
