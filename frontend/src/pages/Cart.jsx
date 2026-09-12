import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

const sanitizeCart = (savedCart = []) => {
    if (!Array.isArray(savedCart)) {
        return [];
    }

    return savedCart
        .map((item) => {
            if (!item) {
                return null;
            }

            const itemId = item.menuItem || item._id || item.id;

            if (
                !itemId ||
                typeof itemId !== "string" ||
                !/^[a-fA-F0-9]{24}$/.test(itemId)
            ) {
                return null;
            }

            return {
                ...item,
                _id: itemId,
                menuItem: itemId,
                price: Number(item.price || 0),
                quantity: Number(item.quantity || 1)
            };
        })
        .filter(Boolean);
};

function Cart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        try {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const sanitizedCart = sanitizeCart(savedCart);

            if (sanitizedCart.length !== savedCart.length) {
                localStorage.setItem("cart", JSON.stringify(sanitizedCart));
            }

            return sanitizedCart;
        } catch {
            return [];
        }
    });

    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * (item.quantity || 1),
        0
    );

    const removeItem = (id) => {
        const updatedCart = cart.filter(
            (item) => item._id !== id
        );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const placeOrder = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first!");
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            const items = cart.map((item) => ({
                menuItem: item.menuItem || item._id || item.id,
                name: item.name,
                price: Number(item.price),
                quantity: item.quantity || 1
            }));

            const response = await API.post(
                "/orders",
                {
                    items,
                    totalAmount: total
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const order = response.data;

            localStorage.removeItem("cart");
            setCart([]);

            alert(
                `Order placed successfully!\nQueue Number: ${order.queueNumber}`
            );

            navigate(`/order/${order._id}`);

        } catch (error) {
            console.error(
                "ORDER ERROR:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Order creation failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="container">

                <h1 className="page-title">
                    Your Cart 🛒
                </h1>

                {cart.length === 0 ? (
                    <div className="empty">

                        <h2>
                            Your cart is empty
                        </h2>

                        <br />

                        <Link
                            to="/menu"
                            className="btn"
                        >
                            Browse Menu
                        </Link>

                    </div>
                ) : (
                    <>
                        <div className="cart-items">

                            {cart.map((item) => {

                                const quantity =
                                    item.quantity || 1;

                                const itemTotal =
                                    Number(item.price) *
                                    quantity;

                                return (
                                    <div
                                        className="cart-item"
                                        key={item._id}
                                    >

                                        <div>
                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                ₹{item.price} ×{" "}
                                                {quantity}
                                            </p>
                                        </div>

                                        <div>
                                            <strong>
                                                ₹{itemTotal}
                                            </strong>

                                            <br />

                                            <button
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    removeItem(
                                                        item._id
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                        <br />

                        <h2>
                            Total: ₹{total}
                        </h2>

                        <br />

                        <button
                            className="btn"
                            onClick={placeOrder}
                            disabled={loading}
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </>
                )}

            </main>
        </>
    );
}

export default Cart;