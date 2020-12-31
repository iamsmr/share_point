module.exports.handelAuthError = function authError(err) {
  let customErrorObject = {
    error: 1,
    userEmail: "",
    userPassword: "",
    userName: "",
  };
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      customErrorObject[properties.path] = properties.message;
    });
    return customErrorObject;
  }
  if (err.code === 11000) {
    customErrorObject.userEmail = "The User with This email already exist";
    return customErrorObject;
  }
  if (err.message.includes("Invalid UserEmail")) {
    customErrorObject.userEmail = "No account found with this email";
    return customErrorObject;
  }
  if (err.message.includes("Invalid UserPassword")) {
    customErrorObject.userEmail = "Invalid User password";
    return customErrorObject;
  }
  if (err.message.includes("userEmail empty")) {
    customErrorObject.userEmail = "Please Enter a email";
    return customErrorObject;
  }
  if (err.message.includes("password empty")) {
    customErrorObject.userEmail = "Please Enter a password";
    return customErrorObject;
  }
};
