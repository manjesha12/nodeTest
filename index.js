const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {TextDecoder, TextEncoder} = require("util");

require("dotenv").config();

const authRoutes = require("./app/routes/test.route");


mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", authRoutes);


app.get("/", function (request, response) {
    response.send("Hello World!")
})
app.listen(10000, function () {
    console.log("Started application on port %d", 10000)
});