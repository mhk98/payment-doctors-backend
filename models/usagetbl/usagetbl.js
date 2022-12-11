module.exports = (sequelize, DataTypes) => {
  const UsageTbl = sequelize.define(
    "usagetbls",
    {
        id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
     
      chargeTime_start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      chargeTime_end: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      charge_Amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      chargepreAmount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      chargepostAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      
      Toll_Gate_No: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        Tunnel_Entry_Point: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        chargeStatus: {
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
        
    },
    {
      updatedAt: false,
    }
  );

  return UsageTbl;
};
