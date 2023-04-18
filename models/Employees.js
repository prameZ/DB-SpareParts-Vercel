const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EmployeesSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  NickName: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  EmpSubID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employees", EmployeesSchema);
