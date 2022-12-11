module.exports = (sequelize, DataTypes) => {
  const PaymentSuccess = sequelize.define(
    'success',
    {
      tran_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      val_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      card_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      store_amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_no: {
        type: DataTypes.STRING,
      },
      bank_tran_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tran_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_issuer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_sub_brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_issuer_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_issuer_country_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verify_sign: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      currency_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency_rate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    },
  );
  return PaymentSuccess;
};
