const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        ClientId: { type: Number, required: true },
        AgencyId: { type: Number, required: true },
        Name: { type: String, required: true },
        Email: {
            type: String, required: true, unique: true, validate: value => {
                if (!validator.isEmail(value)) {
                    throw new Error({ error: 'Invalid Email address' })
                }
            }
        },
        PhoneNumber: { type: Number, required: true },
        TotalBill: { type: Number, required: true },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const Client = mongoose.model("client", clientSchema);
module.exports = Client;