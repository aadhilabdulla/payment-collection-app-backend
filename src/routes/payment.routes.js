const router = require("express").Router();
const controller = require("../controllers/payment.controller");
/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Make EMI payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment successful
 */
router.post("/payments", controller.makePayment);

/**
 * @swagger
 * /api/payments/{accountNumber}:
 *   get:
 *     summary: Get payment history
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment list
 */

router.get("/payments/:accountNumber", controller.getPayments);

module.exports = router;
