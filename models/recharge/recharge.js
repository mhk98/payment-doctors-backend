module.exports = (sequelize, DataTypes) => {
  const RechargeTBL = sequelize.define('recharge', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    BankType:{
      type: DataTypes.STRING,
      allowNull: true,
   
    },
   
    recharge_date:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    rechargeTime_end:{
      type: DataTypes.DATE,
      allowNull: true,
      },
    recharge_Amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rechargepreAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rechargepostAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    SSLStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TransNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TSStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    successTranId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    // BankType:{
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
   
    // },
   
    // recharge_date:{
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // rechargeTime_end:{
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   },
    // recharge_Amount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // rechargepreAmount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // rechargepostAmount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // SSLStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // TransNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // TSStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // successTranId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });
  return RechargeTBL;
};


// const RechargeTBL = sequelize.define('recharge', {
//   id: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     allowNull: false,
//   },
//   BankType:{
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   recharge_date:{
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   rechargeTime_end:{
//     type: DataTypes.DATE,
//     allowNull: true,
//     },
//   recharge_Amount: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   rechargepreAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   rechargepostAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   SSLStatus: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   TransNumber: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   TSStatus: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   successTranId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });
// }

