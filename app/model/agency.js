const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = new Schema(
  {
    AgencyId: { type: Number, unique: true, required: true },
    Name: { type: String, required: true, unique: true },
    Address1: { type: String, required: true },
    Address2: { type: String, required: false },
    State: { type: String, default: null },
    City: { type: String, required: true },
    Phone_Number: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Agency = mongoose.model("agency", agencySchema);
module.exports = Agency;