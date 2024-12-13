/**
 * Authors: Hugh Jay, Ryley Prudhomme, Zixiao Wang, MongoDB
 *
 * Student IDs: 041120736,
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
import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This will help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("patients");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  console.log("Get 'em all");
});

// This section will help you get a single record by id
router.get("/:displayId", async (req, res) => {
  let collection = await db.collection("patients");
  let query = { displayId: new ObjectId(req.params.displayId) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
  console.log("Record by id", result);
});

router.get('/record', async (req, res) => { 
  const { displayId, lastName } = req.query; 
  try { 
    const record = await Record.findOne({ displayId, lastName }); // Use findOne to get a single record 
    if (!record) { 
      return res.status(404).send(`Record with displayId ${displayId} and lastName ${lastName} not found`); 
    } 
    res.json(record); 
  } catch (error) { 
    res.status(500).send('Server error'); 
  } 
});

let counter = 0;
function generateCustomId() {
    counter = (counter % 999) + 1; // Recycle counter after 999
    const counterStr = counter.toString().padStart(3, '0'); // Ensure it's 3 digits
    const timestamp = Date.now().toString();
    return `${counterStr}${timestamp}`;
}

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let idString = generateCustomId();
    let idArray = [idString, idString.slice(0,2), idString.slice(3)]
    let newDocument = {
        _id: Number(idArray[0]),
        displayId: Number(idArray[1]),
        checkedInTime: Number(idArray[2]),
        triaged: req.body.triaged,
        urgency: req.body.urgency,
        severity: req.body.severity,
        admitted: req.body.admitted,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pronouns: req.body.pronouns,
        age: req.body.age,
        biologicalSex: req.body.biologicalSex,
        publicHealthNum: req.body.publicHealthNum,
        privateHealthNum: req.body.privateHealthNum,
        conditionCode: req.body.conditionCode,
        conditionType: req.body.conditionType,
        painLevel: req.body.painLevel,
        medications: req.body.medications,
        medicalPresent: req.body.medicalPresent,
        medicalHistory: req.body.medicalHistory,
        allergies: req.body.allergies
    };
    let collection = await db.collection("patients");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    console.log("Record created", newDocument);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        triaged: req.body.triaged,
        urgency: req.body.urgency,
        severity: req.body.severity,
        admitted: req.body.admitted,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pronouns: req.body.pronouns,
        age: req.body.age,
        biologicalSex: req.body.biologicalSex,
        publicHealthNum: req.body.publicHealthNum,
        privateHealthNum: req.body.privateHealthNum,
        conditionCode: req.body.conditionCode,
        conditionType: req.body.conditionType,
        painLevel: req.body.painLevel,
        medications: req.body.medications,
        medicalPresent: req.body.medicalPresent,
        medicalHistory: req.body.medicalHistory,
        allergies: req.body.allergies
      },
    };

    let collection = await db.collection("patients");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
    console.log("Record updated", updates);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("patients");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;