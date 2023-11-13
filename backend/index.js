import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import bookRouter from "./routes/bookRoute.js";

const app = express();

//Middleware to parsing request body
app.use(express.json());

//Middleware to handling cors POLICY
//Options 1: Allow all origins with default of cors
app.use(cors());

//Options 2: Allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get("/", async (req, res) => {
  return res.status(234).send("Welcome to the Express");
});
app.use("/books", bookRouter);

//Connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
