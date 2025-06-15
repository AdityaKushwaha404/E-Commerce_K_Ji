const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./route.userRoutes")

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;


connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to Rabbit API");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
