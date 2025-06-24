const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const router = express.Router();

// ✅ GET all orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("🔥 Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ DELETE an order
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("🔥 Delete Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ PUT update order status
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status
    if (status) {
      order.status = status;

      if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = new Date();
      }
    }

    const updatedOrder = await order.save();

    // ✅ Populate the user field before returning
    await updatedOrder.populate('user', 'name email');

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("🔥 Update Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
