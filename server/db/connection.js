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
 * Code Source: https://www.mongodb.com/resources/languages/mern-stack-tutorial
 */
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("emergency_waitlist");

export default db;