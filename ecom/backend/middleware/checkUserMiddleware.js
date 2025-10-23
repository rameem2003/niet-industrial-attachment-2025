const jwt = require("jsonwebtoken");

const checkUserMiddleware = (req, res, next) => {
  console.log(req.cookies.token);
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized User",
    });
  }

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized User",
      });
    }

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized User",
      });
    }

    // console.log(decoded); // bar
  });

  //   console.log("Middleware Is Working.... ");
};

module.exports = checkUserMiddleware;
