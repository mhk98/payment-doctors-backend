module.exports = (sequelize, DataTypes) => {
  const PaymentFail = sequelize.define(
    'fail',
    {
      tran_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      card_type: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
      },
      tran_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_issuer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_sub_brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_issuer_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_issuer_country_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verify_sign: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      currency_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currency_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
    },
  );
  return PaymentFail;
};
