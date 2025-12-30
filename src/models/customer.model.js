module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Customer", {
    accountNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    issueDate: DataTypes.DATE,
    interestRate: DataTypes.FLOAT,
    tenure: DataTypes.INTEGER,
    emiDue: DataTypes.FLOAT,
  });
};
