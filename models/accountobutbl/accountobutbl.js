module.exports = (sequelize, DataTypes) => {
    const accountOBUtbls = sequelize.define(
      "accountOBUtbls",
      {
          id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        TSaccountId: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
		acBalance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      },
      {
        updatedAt: false,
      }
    );
  
    return accountOBUtbls;
  };