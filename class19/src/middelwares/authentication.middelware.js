export const authentication = (req, res, next) => {
  if (req.session.user) {
    return next;
  }

  res.redirect('/views/login')
};
