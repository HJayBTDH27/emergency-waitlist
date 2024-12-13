const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        default: Date.now()
    },
    triaged: {
        type: Boolean,
        required: true,
        default: false
    },
    urgency: {
        type: Number,
        default: 0,
        required: false
    },
    severity: {
        type: Number,
        default: 0,
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
        type: String,
        required: true
    },
    publicHealthNum: {
        type: Number,
        required: true
    },
    privateHealthNum: {
        type: Number,
        default: 0,
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
        default: "N/A",
        trim: false
    },
    medicalPresent: {
        type: String,
        default: "N/A",
        trim: false
    },
    medicalHistory: {
        type: String,
        default: "N/A",
        trim: false
    },
    allergies: {
        type: String,
        default: "N/A",
        trim: false
    }
});


recordSchema.plugin(AutoIncrement, { id: 'displayId_seq', inc_field: 'displayId', start_seq: 0, max_value: 999 });

recordSchema.pre('validate', function(next) { 
    if (this.isNew) { 
        this._id = Number(`${this.displayId}${this.checkedInTime.getTime()}`);
        this.displayId = this.displayId;
     } 
     next(); 
});
// recordSchema.pre('save', function(next) {
//     this._id = `${this.displayId}${this.checkedInTime.getTime()}`;
//     next();
// });
// recordSchema.pre('save', function(next) { 
//     if (this.isNew) { // Wait for the displayId to be incremented before setting _id 
//     this.constructor.findByIdAndUpdate({ _id: this._id }, { $set: { displayId: this.displayId } }, { new: true, upsert: true }) .then(() => { 
//         this._id = `${this.displayId}${this.checkedInTime.getTime()}`; 
//         next(); 
//         }) 
//         .catch(err => next(err)); 
//     } else { 
//         next(); 
//     } 
// });
console.log('recordSchema', recordSchema);

recordSchema.index({ _id: 1 }, { unique: true });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;