/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: List of customers
 */


const router = require("express").Router();
const controller = require("../controllers/customer.controller");

router.get("/customers", controller.getCustomers);

module.exports = router;
