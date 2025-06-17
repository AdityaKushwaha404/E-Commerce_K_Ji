const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { Checkout } = require('../models/Checkout');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create a new checkout session
// @access  Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  if (!shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Shipping address and payment method are required" });
  }

  try {
    const checkout = new Checkout({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: false,
    });

    const createdCheckout = await checkout.save();

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { products: [], totalPrice: 0 }
    );

    res.status(201).json({
      message: "Checkout session created",
      checkout: createdCheckout,
    });
  } catch (error) {
    console.error("🔥 Checkout Session Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   PUT /api/checkout/:id/pay
// @desc    Update checkout payment status
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus.toLowerCase() === "paid") {
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      checkout.paymentStatus = "paid";
      checkout.paymentDetails = paymentDetails;
    } else {
      checkout.paymentStatus = paymentStatus.toLowerCase();
    }

    const updatedCheckout = await checkout.save();

    res.status(200).json({
      message: "Checkout payment updated successfully",
      checkout: updatedCheckout,
    });
  } catch (error) {
    console.error("🔥 Payment Update Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   POST /api/checkout/:id/finalize
// @desc    Finalize a checkout/order after payment confirmation
// @access  Private/Admin
router.post("/:id/finalize", protect,  async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout must be paid before finalizing." });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout is already finalized." });
    }

    // Create final order from checkout
    const finalOrder = new Order({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentStatus: "paid",
      paymentDetails: checkout.paymentDetails,
      isDelivered: false,
    });

    const createdOrder = await finalOrder.save();

    // Mark checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // Optionally clear user's cart again (if needed)
    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json({
      message: "Order created, checkout finalized, and cart cleared.",
      order: createdOrder,
    });
  } catch (error) {
    console.error("🔥 Finalize Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
