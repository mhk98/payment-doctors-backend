// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createResponse } = require("../utils/responseGenerator");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { verifyJWT } = require("../utils/jwt_token");
module.exports.validateUser = async (req, res, next) => {
  (
    "---------------------------------validate-----------------------------------"
  );
  const { authorization } = req.headers;
  if (!authorization)
    return res.json(createResponse(null, "Not authenticated!"));
  try {
    let splitted = authorization.split(" ");
    let token = splitted[1];
    token = JSON.parse(token);
    //mostofa eidit token => user all information
    const { email, Mobile_No, User_FirstName, User_LastName, id } =
      await verifyJWT(token);
    req.User_Email = email;
    req.Mobile_No = Mobile_No;
    req.User_FirstName = User_FirstName;
    req.User_LastName = User_LastName;
    req.id = id;
    return next();
  } catch (err) {
    return res.json(createResponse(null, err));
  }
};
