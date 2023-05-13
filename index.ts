import express from "express";
import sequelize from "./models";
import { AuthRoutes } from "./routes/auth.routes";

const app = express();
const port = process.env.PORT || 8000;

app.use("/api", new AuthRoutes().router);

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  app.listen(port, () => console.log(`Server running on ${port}`));
});

// db.sequelize.sync({ alter: true, logging: false }).then(() => {
//   app.listen(port, () => console.log(`App running on ${port}`));
// });
