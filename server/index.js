require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
db();
app.use(express.json());
app.use(cors());
const job = require("./app/tasks/newsFeed");
job.start();

const categoryRoute = require("./app/routes/categoryRoute");
const feedRoute = require("./app/routes/feedRoute");
const userRoute = require("./app/routes/userRoute");

app.use("/category", categoryRoute);
app.use("/feeds", feedRoute);
app.use("/users", userRoute);
const port = process.env.PORT || 4050;
app.listen(port, async () => {
  console.log("connected to port ", port);
});
