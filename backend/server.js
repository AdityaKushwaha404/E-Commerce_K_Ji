const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

connectDB();

// ✅ Mount your user routes
app.use("/api/users", userRoutes); // This is the missing line!
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// ✅ Add a simple route for testing

app.get("/", (req, res) => {
    res.send("Welcome to Rabbit API");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
