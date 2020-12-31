const { User } = require("../models/user");
const { handelAuthError } = require("../errors/authentication__error");

function handelResponse(user, jwt) {
  return {
    error: 0,
    userName: user.userName,
    userEmail: user.userEmail,
    userId: user._id,
    token: jwt,
  };
}
//login into application
module.exports.login_post = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const loginUser = await User.login(
      req.body.userEmail,
      req.body.userPassword
    );
    const jsonWebToken = loginUser.generateJsonWebToken(loginUser);
    res.send(handelResponse(loginUser, jsonWebToken));
  } catch (err) {
    console.log(err);
    const errorObject = handelAuthError(err);
    res.status(400).send(errorObject);
  }
};

module.exports.register_post = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const newUser = await User.create({ userName, userEmail, userPassword });
    const jsonWebToken = newUser.generateJsonWebToken(newUser);

    res.send(handelResponse(newUser, jsonWebToken));
  } catch (err) {
    const errorObject = handelAuthError(err);
    res.status(400).send(errorObject);
  }
};
