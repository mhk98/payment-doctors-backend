module.exports = (sequelize, DataTypes) => {
  const CardTbl = sequelize.define(
  "cardtbls",
     {
          id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
       
        Device_Type: {
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        Physical_ID: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      
        Issue_Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        Expire_Date: {
            type: DataTypes.DATE,
            allowNull: true,
          },
        last_chargeamounte: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        
        last_chargeTime: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          status: {
            type: DataTypes.STRING,
            defaultValue: "Pending",
          },
		  Vehicle: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
		  TScardId: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
      },
      {
        updatedAt: false,
      }
);

return CardTbl;
};