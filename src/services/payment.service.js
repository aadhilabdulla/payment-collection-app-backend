const { Customer, Payment } = require("../models");

exports.createPayment = async (accountNumber, amount) => {
  const customer = await Customer.findOne({ where: { accountNumber } });
  if (!customer) throw new Error("Customer not found");
  
  // if (amount !== customer.emiDue) {
  //   throw new Error("Partial EMI payment not allowed");
  // }

  return Payment.create({
    paymentAmount: amount,
    CustomerId: customer.id,
  });
};

exports.getPaymentsByAccount = async (accountNumber) => {
  const customer = await Customer.findOne({ where: { accountNumber } });
  if (!customer) throw new Error("Customer not found");

  return Payment.findAll({ where: { CustomerId: customer.id } });
};
