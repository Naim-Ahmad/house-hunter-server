const express = require("express");
const connectDB = require("./db/connectDB");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { authRouter } = require("./api/auth/register");

const app = express();

const port = process.env.PORT || 5000;

// global middlewares
app.use([
  express.json(),
  cookieParser(),
  morgan("dev"),
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
]);

// app.post("/api/auth/register", );

// auth router
app.use("/api/auth", authRouter);

async function main() {
  await connectDB();
  app.listen(port, () => console.log(`Server is running on port ${port}...`));
}

main();
