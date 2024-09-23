import "dotenv/config";
import express from "express";
import { PORT, MONGODB_URL } from "./config.js ";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'

const app = express();
app.use(cors());

// middleware for parsing request body
app.use(express.json());

// middleware for handling books routes
app.use("/books", booksRoute);

// middleware for handling CORS policy

// option 1: allows all origins with default of cors (*)

// option 2: allows custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// home page route 
app.get("/", (req, res) => {
  return res.send("welcome to the express hompage");
});

// connect to mongodb route
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
