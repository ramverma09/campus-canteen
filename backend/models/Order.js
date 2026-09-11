const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true
        },

        queueNumber: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "WAITING",
                "PREPARING",
                "READY",
                "COMPLETED"
            ],
            default: "WAITING"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);