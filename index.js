const express = require("express");
const connectDB = require("./db/connectDB");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { authRouter } = require("./api/auth/auth");
const Houses = require("./model/Houses");
const User = require("./model/Users");

const app = express();

const port = process.env.PORT || 5000;

// global middlewares
app.use([
  express.json(),
  cookieParser(),
  morgan("dev"),
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://house-hunter-client-psi.vercel.app",
    ],
    credentials: true,
  }),
]);

// app.post("/api/auth/register", )

// auth router
app.use("/api/auth", authRouter);

app.get("/api/allHouses", async (req, res) => {
  try {
    let query = {};

    const queryParams = req.query;

    if (queryParams.limit) {
      const result = await Houses.find(query)
        .skip(queryParams.skip)
        .limit(queryParams.limit);
      return res.send(result);
    }

    if (queryParams.city) {
      query = { city: queryParams.city };
    }

    // if(queryParams.bedRooms){
    //   query
    // }

    const result = await Houses.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/api/houseCount", async (req, res) => {
  const result = await Houses.estimatedDocumentCount();
  res.send({ count: result });
});

app.get("/api/myHouses/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Houses.find({ userId: req.params.id });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/addHouse", async (req, res) => {
  try {
    let newHOuse = new Houses(req.body);
    newHOuse = await newHOuse.save();
    const doc = { $push: { houses: newHOuse._id } };
    const updatedDoc = await User.findByIdAndUpdate(req.body.userId, doc);
    console.log(updatedDoc);

    res.send(newHOuse);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

async function main() {
  await connectDB();
  app.listen(port, () => console.log(`Server is running on port ${port}...`));
}

main();
