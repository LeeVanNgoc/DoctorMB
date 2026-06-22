const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Doctor Manager API Running"
    });
});