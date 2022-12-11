module.exports = (sequelize, DataTypes) => {
  const Hotels = sequelize.define(
    'hotels',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      hotel_email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      emergency_contact: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        defaultValue: 'Pending',
      },
    },
    {
      updatedAt: false,
    },
  );

  return Hotels;
};
