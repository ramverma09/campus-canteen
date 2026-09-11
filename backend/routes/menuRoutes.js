const express = require("express");

const MenuItem = require("../models/MenuItem");

const router = express.Router();


// GET ALL AVAILABLE MENU ITEMS

router.get("/", async (req, res) => {

    try {

        const menuItems =
            await MenuItem.find({
                available: true
            });

        res.json(menuItems);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch menu",
            error: error.message
        });

    }

});


module.exports = router;