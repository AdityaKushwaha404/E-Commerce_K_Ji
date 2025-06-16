const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      required: true
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      required: true,
      example: ["S", "M", "L"],
    },
    colors: {
      type: [String],
      required: true,
      example: ["Red", "Blue"],
    },
    collections: {
      type: String,
      required: true,
      example: "Summercollection",
    },
    material: {
      type: String,
    },
   gender: {
  type: String,
  enum: ["Men", "Women", "Unisex"],
},

    images: {
      type: [
        {
          url: { type: String, required: true },
          altText: { type: String },
        },
      ],
      
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    weight: {
      type: Number,
    },
  },
  {
    timestamps: true, // includes createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Product", productSchema);
