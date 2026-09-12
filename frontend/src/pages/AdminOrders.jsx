import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/orders/admin/all");
            setOrders(response.data);
        } catch (error) {
            console.error(
                "Failed to fetch orders:",
                error.response?.data || error.message
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

    const updateStatus = async (orderId, status) => {
        try {
            await API.put(`/orders/${orderId}/status`, {
                status
            });

            await fetchOrders();

        } catch (error) {
            console.error(
                "Status update failed:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update order"
            );
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="container">
                    <h1 className="page-title">
                        Admin Orders
                    </h1>
                    <p>Loading orders...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1 className="page-title">
                    Admin Orders
                </h1>

                {orders.length === 0 ? (
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

                                    <h3>
                                        Queue #{order.queueNumber}
                                    </h3>

                                    <p>
                                        Student:{" "}
                                        {order.userId?.name || "Unknown"}
                                    </p>

                                    <p>
                                        Total: ₹
                                        {order.totalAmount}
                                    </p>

                                    <p>
                                        Status:{" "}
                                        <strong>
                                            {order.status}
                                        </strong>
                                    </p>

                                    <div>
                                        {order.items.map(
                                            (item, index) => (
                                                <p key={index}>
                                                    {item.name} ×{" "}
                                                    {item.quantity}
                                                </p>
                                            )
                                        )}
                                    </div>

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
                                            ✅ Order Completed
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
