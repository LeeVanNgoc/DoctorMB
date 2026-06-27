const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");


app.use(cors());
app.use(express.json());

module.exports = app;


app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Doctor Manager API Running"
    });
});