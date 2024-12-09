/**
 * Authors: MongoDB
 * 
 * Student IDs: n/a
 * 
 * Course CST3106 -  Internet Architecture and Web Development
 * 
 * Term: Fall 2024
 * 
 * Assignment: Assignment 3
 * 
 * Date: 2024-12-08
 * 
 * Code source: https://www.mongodb.com/resources/languages/mern-stack-tutorial
 */
import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});