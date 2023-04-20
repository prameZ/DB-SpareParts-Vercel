const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SparepartsSchema = new Schema({
  PartSubID: {
    type: String,
    required: true,
  },
  PartName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  PartCode: {
    type: String,
    required: false,
  },
  Brand: {
    type: String,
    required: false,
  },
  No: {
    type: String,
    required: true,
  },
  Lock: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Amountalart: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Unit: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Spareparts", SparepartsSchema);
