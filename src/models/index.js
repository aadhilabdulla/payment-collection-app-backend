const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = require("./customer.model")(sequelize, DataTypes);
const Payment = require("./payment.model")(sequelize, DataTypes);

Customer.hasMany(Payment);
Payment.belongsTo(Customer);

module.exports = { sequelize, Customer, Payment };
