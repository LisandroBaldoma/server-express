export function auth(req, res, next) {
    console.log("mildware AUTH,");
    if (req.session.user) {
      console.log("Sesion iniciada");
      next();
    } else {
      console.log("sin sesion iniciada, redireccionar a LOGIN");
      res.redirect("/login");
    }
  }
  