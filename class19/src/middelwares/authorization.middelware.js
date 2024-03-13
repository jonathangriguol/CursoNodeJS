export const authorization = (req, res, next) => {
  if (req.session.username === "jgriguol") {
    return next;
  }

  res.status(401).json({ error: "Unauthorized" });
};
