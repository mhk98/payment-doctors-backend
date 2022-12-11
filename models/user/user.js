const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes, Sequelize) => {
  const usertbls = sequelize.define(
    "usertbl",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      User_Type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      User_Name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      Authorized_Name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      User_Email: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      PIN: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      IDcard: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      Passportno: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      pass_word: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      Mobile_No: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      agent: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      
    },
    //help
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.pass_word) {
            const salt = await bcrypt.genSaltSync(10);
            user.pass_word = bcrypt.hashSync(user.pass_word, salt);
          }
        },
      },
    }
  );
  usertbls.prototype.validPassword = async (pass_word, hash) => {
    return await bcrypt.compareSync(pass_word, hash);
  };
  usertbls.prototype.getHashPass = async (pass_word) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(pass_word, salt);
    return hashed;
  };
  return usertbls;
};
