module.exports = (sequelize, DataTypes) => {
    const RefundTbl = sequelize.define(
        "refundtbl",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            refund_amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            refund_remarks: {
                type: DataTypes.STRING(60),
                allowNull: true,
            },
            bank_tran_id: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            refund_Date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            refe_id: {
                type: DataTypes.STRING(30),
                unique: true,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "Pending",
                allowNull: true,
            },
            account_Number: {
                type: DataTypes.STRING(30),
                allowNull: true,
            }
        },
        {
            updatedAt: false,
        }
    );
    return RefundTbl;
};