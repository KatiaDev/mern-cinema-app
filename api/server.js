require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const server = express();
const error = require("./middleware/error");
const movieRouter = require("./movie/router");
const cinemaRouter = require("./cinema/router");
const newsRouter = require("./news/router");
const hallRouter = require("./hall/router");
const seatRouter = require("./seat/router");
const premierRouter = require("./premiere/router");
const reservationRouter = require("./reservation/router");
const ticketRouter = require("./ticket/router");
const userRouter = require("./user/router");
const notificationRouter = require("./notification/router");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.8bs0p.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();
server.use(express.json());
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

server.use("/api/movies", movieRouter);
server.use("/api/cinemas", cinemaRouter);
server.use("/api/news", newsRouter);
server.use("/api/halls", hallRouter);
server.use("/api/seats", seatRouter);
server.use("/api/premieres", premierRouter);
server.use("/api/reservations", reservationRouter);
server.use("/api/tickets", ticketRouter);
server.use("/api/users", userRouter);
server.use("/api/notifications", notificationRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to our Cinema !</h1>`);
});

server.use(error);
module.exports = server;
