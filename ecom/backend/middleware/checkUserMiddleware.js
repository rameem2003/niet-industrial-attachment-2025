const checkUserMiddleware = (req, res, next) => {
  console.log(req.cookies.token);
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized User",
    });
  }

  //   console.log("Middleware Is Working.... ");
  next();
};

module.exports = checkUserMiddleware;
