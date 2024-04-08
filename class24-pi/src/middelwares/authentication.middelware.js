export const authentication = (req, res, next) => {
  if (req.user) {
    return next;
  }

  res.redirect('/views/login')
};
