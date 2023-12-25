const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("not authorized");
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json("incorrect type of token");
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (e) {
    return res.status(401).json(e.toString());
  }
};
