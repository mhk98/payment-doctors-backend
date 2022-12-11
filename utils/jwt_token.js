const jwt = require("jsonwebtoken");
require("dotenv").config();
//mostofa eidit token => user all information
module.exports.getJWT = (email,Mobile_No, User_FirstName, User_LastName, id) => {
  return jwt.sign(
    {
      User_Email : email,
      Mobile_No: Mobile_No,
      User_FirstName: User_FirstName,
      User_LastName: User_LastName,
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

module.exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
