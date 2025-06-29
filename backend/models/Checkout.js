import mongoose from 'mongoose';

// --- CheckoutItem Schema ---
const CheckoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Assuming a 'Product' model exists
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    } // <-- Add this line
    // Add other fields if needed (size, color, etc.)
  },
  { _id: false } // ✅ This disables _id for items in the array
);

// --- Checkout Schema ---
const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a 'User' model exists
      required: true
    },
    checkoutItems: {
      type: [CheckoutItemSchema],
      required: true
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },
    paymentStatus: {
      type: String
    },
    paymentDetails: {
      type: Object
    },
    isFinalized: {
      type: Boolean,
      default: false
    },
    finalizedAt: {
      type: Date
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt fields
  }
);

// --- Export the models ---
export const Checkout = mongoose.model('Checkout', CheckoutSchema);
