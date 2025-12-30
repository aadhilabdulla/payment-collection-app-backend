const service = require("../services/customer.service");

exports.getCustomers = async (req, res, next) => {
  try {
      const data = await service.getAllCustomers();
  res.json(data);
  } catch (error) {
    next(error);
  }
};