import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/orders/admin/all");

            console.log("ADMIN ORDERS:", response.data);

            setOrders(response.data);
        } catch (error) {
            console.error(
                "Admin orders error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await API.put(
                `/orders/${orderId}/status`,
                { status: newStatus }
            );

            await fetchOrders();
        } catch (error) {
            console.error(
                "Status update error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update order"
            );
        }
    };

    return (
        <>
            <Navbar />

            <main className="container">
                <h1 className="page-title">
                    Admin Orders
                </h1>

                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <div className="empty">
                        <h2>No orders found</h2>
                    </div>
                ) : (
                    <div className="cart-items">

                        {orders.map((order) => (
                            <div
                                className="cart-item"
                                key={order._id}
                            >
                                <div>
                                    <h2>
                                        Queue #{order.queueNumber}
                                    </h2>

                                    <p>
                                        Student:{" "}
                                        {order.userId?.name || "Unknown"}
                                    </p>

                                    <p>
                                        Email:{" "}
                                        {order.userId?.email || "Unknown"}
                                    </p>

                                    <br />

                                    {order.items.map((item, index) => (
                                        <p key={index}>
                                            {item.name} × {item.quantity}
                                            {" = "}
                                            ₹{item.price * item.quantity}
                                        </p>
                                    ))}

                                    <h3>
                                        Total: ₹{order.totalAmount}
                                    </h3>

                                    <p>
                                        Status:{" "}
                                        <strong>
                                            {order.status}
                                        </strong>
                                    </p>
                                </div>

                                <div>

                                    {order.status === "WAITING" && (
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "PREPARING"
                                                )
                                            }
                                        >
                                            Start Preparing
                                        </button>
                                    )}

                                    {order.status === "PREPARING" && (
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "READY"
                                                )
                                            }
                                        >
                                            Mark Ready
                                        </button>
                                    )}

                                    {order.status === "READY" && (
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "COMPLETED"
                                                )
                                            }
                                        >
                                            Complete Order
                                        </button>
                                    )}

                                    {order.status === "COMPLETED" && (
                                        <p>
                                            ✅ Completed
                                        </p>
                                    )}

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </main>
        </>
    );
}

export default AdminOrders;