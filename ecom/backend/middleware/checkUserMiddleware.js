const checkUserMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized User",
    });
  }

  //   console.log("Middleware Is Working.... ");
  next();
};

module.exports = checkUserMiddleware;
