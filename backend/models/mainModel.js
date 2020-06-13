const mongoose = require('mongoose');

const mainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A info must have a name'],
            index: false,
            unique: false
        },
        datetime: {
            type: String,
            required: [true, 'A info must have a date'],
            unique: false
        },
        people: {
            type: Number,
            required: [true, 'A info must have a number of people'],
            unique: false
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);
//this is the model
const Info = mongoose.model('Info', mainSchema);

module.exports = Info;