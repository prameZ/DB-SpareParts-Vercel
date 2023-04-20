const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HistorySparepartsPickupSchema = new Schema({
  PartSubID: {
    type: String,
    required: true,
  },
  SparepartsPickupSubID: {
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
  Brand: {
    type: String,
    required: false,
  },
  RequisitionAmount: {
    type: Number,
    required: true,
  },
  Unit: {
    type: String,
    required: false,
  },
  PartCode: {
    type: String,
    required: false,
  },
  Image: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  sec: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Forerunner: {
    type: String,
    required: true,
  },
  AmountForReturn: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "HistorySparepartsPickup",
  HistorySparepartsPickupSchema
);
