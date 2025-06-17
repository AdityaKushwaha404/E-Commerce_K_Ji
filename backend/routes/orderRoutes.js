const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const router = express.Router();

// ✅ Must be first
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("🔥 Get Orders Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Must come after
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("🔥 Get Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
});

module.exports = router;
