require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
