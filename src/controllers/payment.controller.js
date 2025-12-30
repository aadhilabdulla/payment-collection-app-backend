const service = require("../services/payment.service");

exports.makePayment = async (req, res, next) => {
  try {
    const { accountNumber, amount } = req.body;
    const payment = await service.createPayment(accountNumber, amount);
    res.json({ message: "Payment successful", payment });
  } catch (err) {
    next(err);
  }
};


exports.getPayments = async (req, res, next) => {
  try {
    const payments = await service.getPaymentsByAccount(req.params.accountNumber);
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
