const { Customer, Payment } = require("../models");
const { Op } = require("sequelize");

const monthsBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return months < 0 ? 0 : months;
};

exports.getAllCustomers = async () => {
  const customers = await Customer.findAll({
    include: [{ model: Payment }],
  });

  const today = new Date();

  return customers.map(customer => {
    const monthsElapsed = monthsBetween(customer.issueDate, today);

    const expectedAmount = monthsElapsed * customer.emiDue;

    const paidAmount = customer.Payments.reduce(
      (sum, p) => sum + p.paymentAmount,
      0
    );

    const outstanding = Math.max(expectedAmount - paidAmount, 0);

    return {
      accountNumber: customer.accountNumber,
      issueDate: customer.issueDate,
      interestRate: customer.interestRate,
      tenure: customer.tenure,
      monthlyEmi: customer.emiDue,
      monthsElapsed,
      totalPaid: paidAmount,
      totalDue: outstanding,
    };
  });
};
