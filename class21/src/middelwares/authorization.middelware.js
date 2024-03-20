export const privateAccess = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/views/login");
  }

  next();
};


export const publicAccess = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  next();
};