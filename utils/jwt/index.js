const jwt = require("jsonwebtoken");
const models = require("../../db/models");


const jwtSecret = "123";

const jwtCreate = (data) => jwt.sign(data, jwtSecret, { noTimestamp: true });

const jwtValidate = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const jwtMiddleWare = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log("check auth  ", req.headers);

  if (!authorization || !jwtValidate(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  // req.userData = jwtValidate(authorization)

  req.userData = await models.todoUser.findOne({
    where: jwtValidate(authorization?.id),
  });

  next();
};

module.exports = { jwtCreate, jwtValidate, jwtMiddleWare };
