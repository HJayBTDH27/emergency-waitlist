const Record = require('../models/recordModel'); // Import the Record model

// Get all records
exports.getAllRecords = async (req, res) => {
    try {
        const records = await Record.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single record by ID
exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new record
exports.createRecord = async (req, res) => {
    try {
        const record = new Record(req.body);
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing record
exports.updateRecord = async (req, res) => {
    try {
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await Record.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};