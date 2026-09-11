const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB =
    require("./config/database");

dotenv.config();

const app = express();


// ==========================
// DATABASE
// ==========================

connectDB();


// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());


// ==========================
// ROUTES
// ==========================

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/menu",
    require("./routes/menuRoutes")
);

app.use(
    "/api/orders",
    require("./routes/orderRoutes")
);


// ==========================
// TEST ROUTE
// ==========================

app.get("/", (req, res) => {

    res.json({
        message:
            "Campus Canteen API is running"
    });

});


// ==========================
// SERVER
// ==========================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});