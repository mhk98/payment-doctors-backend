module.exports = (sequelize, DataTypes) => {
  const lost_historytbls = sequelize.define('lost_historytbl', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true
    },
    Lost_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Last_Balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Balance_Transferred: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Card_Issue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     Reffered_to: {
      type: DataTypes.STRING,
      allowNull: true,
     },
  });
  return lost_historytbls;
};