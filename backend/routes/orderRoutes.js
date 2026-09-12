const express = require("express");

const Order = require("../models/Order");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================
// CREATE ORDER
// ==========================

router.post("/", protect, async (req, res) => {

    try {

        const {
            items,
            totalAmount
        } = req.body;

        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Order must contain items"
            });

        }

        const lastOrder =
            await Order
                .findOne()
                .sort({ queueNumber: -1 });

        const queueNumber =
            lastOrder
                ? lastOrder.queueNumber + 1
                : 1;

        const order = new Order({

            userId: req.user.userId,

            items,

            totalAmount,

            queueNumber,

            status: "WAITING"

        });

        await order.save();

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({

            message: "Order creation failed",

            error: error.message

        });

    }

});


// ==========================
// GET USER ORDERS
// ==========================

router.get("/", protect, async (req, res) => {

    try {

        const orders =
            await Order
                .find({
                    userId: req.user.userId
                })
                .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({

            message: "Failed to fetch orders",

            error: error.message

        });

    }

});


// ==========================
// ADMIN GET ALL ORDERS
// ==========================

router.get(
    "/admin/all",
    protect,
    adminOnly,
    async (req, res) => {

        try {

            const orders =
                await Order
                    .find()
                    .populate(
                        "userId",
                        "name email"
                    )
                    .sort({
                        createdAt: -1
                    });

            res.json(orders);

        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to fetch admin orders",

                error:
                    error.message

            });

        }

    }
);


// ==========================
// UPDATE ORDER STATUS
// ==========================

// ==========================
// GET SINGLE ORDER
// ==========================

router.get("/:id", protect, async (req, res) => {

    try {

        const order =
            await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.json(order);

    } catch (error) {

        res.status(500).json({

            message: "Failed to fetch order",

            error: error.message

        });

    }

});

router.put(
    "/:id/status",
    protect,
    adminOnly,
    async (req, res) => {

        try {

            const {
                status
            } = req.body;

            const allowedStatuses = [
                "WAITING",
                "PREPARING",
                "READY",
                "COMPLETED"
            ];

            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({
                    message: "Invalid status"
                });

            }

            const order =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    { status },
                    { new: true }
                );

            if (!order) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }

            res.json(order);

        } catch (error) {

            res.status(500).json({

                message:
                    "Failed to update order",

                error:
                    error.message

            });

        }

    }
);


module.exports = router;