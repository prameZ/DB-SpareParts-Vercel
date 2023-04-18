const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HistorySparepartsReturnSchema = new Schema({
  SparepartsReturnSubID: {
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
    required: true,
  },
  ReturnAmount: {
    type: Number,
    required: true,
  },
  Unit: {
    type: String,
    required: true,
  },
  PartCode: {
    type: String,
    required: true,
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
  Oldyear: {
    type: Number,
    required: true,
  },
  Oldmonth: {
    type: Number,
    required: true,
  },
  Olddate: {
    type: Number,
    required: true,
  },
  Oldhour: {
    type: Number,
    required: true,
  },
  Oldmin: {
    type: Number,
    required: true,
  },
  Oldsec: {
    type: Number,
    required: true,
  },
  AmountForReturn: {
    type: Number,
    required: true,
  },
  RequisitionAmount: {
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
});

module.exports = mongoose.model(
  "HistorySparepartsReturn",
  HistorySparepartsReturnSchema
);
