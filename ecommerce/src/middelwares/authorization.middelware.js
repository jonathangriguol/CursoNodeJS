export const authorization = (role) => {
  return (req, res, next) => {

    console.log("🚀 ~ return ~ req.user:", req.user)
    
    if (!req.user)
      return res.status(401).json({ status: "error", error: "Unauthorized" });

    console.log("🚀 ~ return ~ req.user.role:", req.user.role)
    if (!req.user.role !== role)
      return res.status(403).json({ status: "error", error: "Forbiden" });

    next();
  };
};

export const privateAccess = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/views/login");
  }

  next();
};

export const publicAccess = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }

  next();
};
