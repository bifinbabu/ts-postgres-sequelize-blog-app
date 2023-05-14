import express from "express";
import sequelize from "./models";
import { AuthRoutes } from "./routes/auth.routes";
import { PostRoutes } from "./routes/post.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

const routes = [new AuthRoutes(), new PostRoutes()];

routes.forEach((route) => app.use("/api", route.router));

// app.use("/api", new AuthRoutes().router);

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  app.listen(port, () => console.log(`Server running on ${port}`));
});

// db.sequelize.sync({ alter: true, logging: false }).then(() => {
//   app.listen(port, () => console.log(`App running on ${port}`));
// });
