import express from "express";
import routes from "./src/routes"
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

// parse json
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

//global error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  return res.status(404).send({ message: "not found" });
});

export default app.listen(port, () =>
  console.log(`API server ready on http://localhost:${port}`)
);
