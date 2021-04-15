if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.8bs0p.mongodb.net/Cinema?retryWrites=true&w=majority`,
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

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to our Cinema !</h1>`);
});

module.exports = server;

// 1.
// 2.
// 3.
// 4.
// 5.
