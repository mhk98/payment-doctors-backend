module.exports = (sequelize, DataTypes) => {
    const otp = sequelize.define('otp', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Mobile_No:{
        type: DataTypes.STRING,
        allowNull: true,
     
      }, 
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
     
      },
      otpExpireTime :{
        type: DataTypes.DATE,
        allowNull: true
      }  
    });
    return otp;
  };
  