const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
            lowercase: true, // Ensure email is stored in lowercase
        },
        subscribedAt: {
            type: Date,
            default: Date.now, // Automatically set to current date/time when created
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema); // Export the model