const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Utility to get cart based on userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// @route   POST /api/cart
// @desc    Add item to cart (guest or user)
// @access  Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  const parsedQuantity = parseInt(quantity);

  if (!productId || isNaN(parsedQuantity) || parsedQuantity < 1) {
    return res.status(400).json({ message: "Product ID and valid quantity are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);
    if (!cart) {
      cart = await Cart.create({
        userId: userId || undefined,
        guestId: guestId || `guest_${Date.now()}`,
        products: [],
        totalPrice: 0,
      });
    }

    const existingIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingIndex > -1) {
      cart.products[existingIndex].quantity += parsedQuantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: product.price,
        size,
        color,
        quantity: parsedQuantity,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("🔥 Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/cart
// @desc    Update quantity or remove product
// @access  Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      cart.products.splice(index, 1);
    } else {
      cart.products[index].quantity = quantity;
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("🔥 Error updating cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Remove product from cart
// @access  Public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(index, 1);
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("🔥 Error removing from cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/cart
// @desc    Get cart for guest or user
// @access  Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    return res.status(200).json({
      products: cart?.products || [],
      totalPrice: cart?.totalPrice || 0,
    });
  } catch (error) {
    console.error("🔥 Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/cart/merge
// @desc    Merge guest cart into user cart
// @access  Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  const userId = req.user._id;

  if (!guestId) return res.status(400).json({ message: "Guest ID is required" });

  try {
    const guestCart = await Cart.findOne({ guestId });
    let userCart = await Cart.findOne({ userId });

    if (!guestCart) {
      return res.status(200).json({
        message: "No guest cart to merge",
        products: userCart?.products || [],
        totalPrice: userCart?.totalPrice || 0,
        userId: req.user._id,
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          createdAt: req.user.createdAt,
          updatedAt: req.user.updatedAt,
        },
      });
    }

    if (!userCart) {
      userCart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    guestCart.products.forEach((item) => {
      const index = userCart.products.findIndex(
        (p) =>
          p.productId.toString() === item.productId.toString() &&
          p.size === item.size &&
          p.color === item.color
      );

      if (index > -1) {
        userCart.products[index].quantity += item.quantity;
      } else {
        userCart.products.push(item);
      }
    });

    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await userCart.save();
    await Cart.deleteOne({ _id: guestCart._id });

    return res.status(200).json({
      message: "Cart merged successfully",
      products: userCart.products,
      totalPrice: userCart.totalPrice,
      userId: req.user._id,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    console.error("🔥 Error merging cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
