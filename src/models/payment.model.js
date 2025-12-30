module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payment", {
    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    paymentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "SUCCESS",
    },
  });
};
