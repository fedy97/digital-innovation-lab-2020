const mongoose = require('mongoose');
//const validator = require('validator');

const mainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A info must have a name'],
      unique: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//this is the model
const Info = mongoose.model('Info', mainSchema);

module.exports = Info;