const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const router = express.Router();

// @route   Get /api/admin/products
// @desc    Get all products
// @access  Private/Admin

router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'name email');
        res.json(products);
    } catch (error) {
        console.error("🔥 Error fetching products:", error);
        res.status(500).json({ message: "Server Error" });
    }
    }
);





module.exports = router;