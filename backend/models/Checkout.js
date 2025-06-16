import mongoose from 'mongoose';

// --- CheckoutItem Schema ---
const CheckoutItemSchema = new mongoose.Schema({
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
    }
    // ,
    // size: {
    //     type: String,
    //     required: false // Not required
    // },
    // color: {
    //     type: String,
    //     required: false // Not required
    // },
    // quantity: {
    //     type: Number,
    //     required: true
    // }
}
{_id: false} // Disable _id for subdocuments if not needed
);



// --- Checkout Schema ---
const CheckoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a 'User' model exists
        required: true
    },
    checkoutItems: {
        type: [CheckoutItemSchema], // Array of CheckoutItemSchema
        required: true
    },
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
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
        default: false // Set default to false if not provided
    },
    paidAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'], // Example enum values
        default: 'pending' // Set default to 'pending'
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed // For flexible payment details
    },
    isFinalized: {
        type: Boolean,
        default: false
    },
    finalizedAt: {
        type: Date
    }
}, {
    timestamps: true // This option automatically adds createdAt and updatedAt fields
});


// --- Export the models ---
export const CheckoutItem = mongoose.model('CheckoutItem', CheckoutItemSchema);
export const Checkout = mongoose.model('Checkout', CheckoutSchema);
