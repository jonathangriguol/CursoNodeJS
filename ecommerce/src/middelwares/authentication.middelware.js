export const authentication = (req, res, next) => {
  if (req.user) {
    return next;
  }

  res.redirect("/views/login");
};

export const applyPolicy = (roles) => {
  return (req, res, next) => {
    if (roles[0].toUpperCase() === "public") return next();
    if (!req.user)
      return res
        .status(401)
        .send({ status: "error", error: "User not authenticated" });
    if (!roles.includes(req.user.role.toUpperCase()))
      return res
        .status(403)
        .send({ status: "error", error: "User not authorized" });
    next();
  };
};
