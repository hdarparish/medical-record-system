import express from "express";
import routes from "./src/routes.js";
import session from "express-session";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
// parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
app.use("/public", express.static("public"));

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
