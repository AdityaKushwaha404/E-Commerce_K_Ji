const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      priceRange,
      discountRange,
      sortBy,
      gender,
      sizes,
      colors,
      material,
      collections,
      isFeatured,
      isPublished,
      search,
      minPrice,
      maxPrice,
      limit,
    } = req.query;

    const filter = {};

    // Case-insensitive regex filters
    if (category) filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    if (brand) filter.brand = { $regex: new RegExp(`^${brand}$`, "i") };
    if (gender) filter.gender = { $regex: new RegExp(`^${gender}$`, "i") };
    if (material) filter.material = { $regex: new RegExp(`^${material}$`, "i") };
    if (collections) filter.collections = { $regex: new RegExp(`^${collections}$`, "i") };

    // Boolean fields
    if (isFeatured) filter.isFeatured = isFeatured === "true";
    if (isPublished) filter.isPublished = isPublished === "true";

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Discount range
    if (discountRange) {
      const [min, max] = discountRange.split(",").map(Number);
      filter.discountPrice = { $gte: min, $lte: max };
    }

    // Sizes & Colors
    if (sizes) filter.sizes = { $in: sizes.split(",").map((s) => s.trim()) };
    if (colors) filter.colors = { $in: colors.split(",").map((c) => c.trim()) };

    // Search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Options
    const sortOption = {};
    if (sortBy === "priceAsc") sortOption.price = 1;
    else if (sortBy === "priceDesc") sortOption.price = -1;
    else if (sortBy === "popularity") sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.discountPrice = req.body.discountPrice || product.discountPrice;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.sku = req.body.sku || product.sku;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.sizes = req.body.sizes || product.sizes;
    product.colors = req.body.colors || product.colors;
    product.collections = req.body.collections || product.collections;
    product.material = req.body.material || product.material;
    product.gender = req.body.gender || product.gender;
    product.images = req.body.images || product.images;
    product.isFeatured = req.body.isFeatured ?? product.isFeatured;
    product.isPublished = req.body.isPublished ?? product.isPublished;
    product.tags = req.body.tags || product.tags;
    product.dimensions = req.body.dimensions || product.dimensions;
    product.weight = req.body.weight || product.weight;

    const updatedProduct = await product.save();

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});






// @route   GET /api/products/best-seller
// @desc    Retrieve the product with the highest rating
// @access  Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error("Best Seller Error:", error);
    res.status(500).send("Server Error");
  }
});




// @route   GET /api/products/new-arrivals
// @desc    Retrieve latest 8 products based on creation date
// @access  Public
router.get("/new-arrivals", async (req, res) => {
  try {
    // Fetch latest 8 products sorted by creation date (descending)
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(newArrivals);
  } catch (error) {
    console.error("New Arrivals Error:", error);
    res.status(500).send("Server Error");
  }
});









// @route   GET /api/products/:id
// @desc    Get a single product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});






// @route   GET /api/products/similar/:id
// @desc    Retrieve similar products based on the current product's gender and category
// @access  Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4); // Optional: Limit the number of results

    res.json(similarProducts);
  } catch (error) {
    console.error("Get Similar Products Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});






// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
