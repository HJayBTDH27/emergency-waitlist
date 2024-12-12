const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    displayId: {
        type: Number,
        required: true
    },
    checkedInTime: {
        type: Date,
        default: Date.now
    },
    triaged: {
        type: Boolean,
        required: true,
        default: false
    },
    urgency: {
        type: Number,
        required: false
    },
    severity: {
        type: Number,
        required: false
    },
    admitted: {
        type: Boolean,
        required: false,
        default: false
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    pronouns: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    biologicalSex: {
        type: Boolean,
        required: true
    },
    publicHealthNum: {
        type: Number,
        required: true
    },
    privateHealthNum: {
        type: Number,
        required: false
    },
    conditionCode: {
        type: Number,
        required: true
    },
    conditionType: {
        type: Number,
        required: true
    },
    painLevel: {
        type: Number,
        required: true
    },
    medications: {
        type: String,
        trim: false
    },
    medicalPresent: {
        type: String,
        trim: false
    },
    medicalHistory: {
        type: String,
        trim: false
    },
    allergies: {
        type: String,
        trim: false
    }
});

recordSchema.plugin(AutoIncrement, { id: 'displayId_seq', inc_field: 'displayId', start_seq: 0, max_value: 999 });

recordSchema.pre('save', function(next) {
    this._id = `${this.displayId}${this.checkedInTime.getTime()}`;
    next();
});

recordSchema.index({ _id: 1 }, { unique: true });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;