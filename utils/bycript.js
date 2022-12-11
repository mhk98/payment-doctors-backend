const bcrypt = require('bcryptjs');

async function hashIt(password){
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

//  hashIt(password);
// compare the password user entered with hashed pass.

async function compareIt(password,hashedPassword){
  console.log(password,"\n",hashedPassword);
  const validPassword = await bcrypt.compare(password, hashedPassword);
  console.log("validattion cehck: ",validPassword);
  return validPassword

}
// compareIt(password);

module.exports = { hashIt, compareIt};