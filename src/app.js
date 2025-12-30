const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorMiddleware = require("./middlewares/error.middleware");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/customer.routes"));
app.use("/api", require("./routes/payment.routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

module.exports = app;