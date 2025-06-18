const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();

// router GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("🔥 Error fetching orders:", error);
        res.status(500).json({ message: "Server Error" });
    }
    }
);


// // @route   GET /api/admin/orders/:id
// // @desc    Get order by ID
// // @access  Private/Admin
// router.get('/:id', protect, admin, async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate('user', 'name email');

//         if (!order) return res.status(404).json({ message: "Order not found" });

//         res.json(order);
//     } catch (error) {
//         console.error("🔥 Get Order Error:", error);
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// }

// );


// @route   DELETE /api/admin/orders/:id
// @desc    Delete an order
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("🔥 Delete Order Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
);


// @route   PUT /api/orders/:id/deliver
// @desc    Mark order as delivered
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order marked as delivered",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("🔥 Deliver Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});




module.exports = router;