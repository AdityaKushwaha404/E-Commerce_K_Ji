import mongoose from 'mongoose';




// --- OrderItem Schema ---
const OrderItemSchema = new mongoose.Schema({
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
    size: {
        type: String,
        
    },
    color: {
        type: String,
        
    },
    quantity: {
        type: Number,
        required: true
    }
}
,{_id: false} // Disable _id for subdocuments if not needed
);

// --- Order Schema ---
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a 'User' model exists
        required: true
    },
    orderItems: {
        type: [OrderItemSchema], // Array of OrderItemSchema
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
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'], // Example enum values
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], // Example enum values
        default: 'Processing'
    }
}, {
    timestamps: true // This option automatically adds createdAt and updatedAt fields
});
export const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
export const Order = mongoose.model('Order', OrderSchema);