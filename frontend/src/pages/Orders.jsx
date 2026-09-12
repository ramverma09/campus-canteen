import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        const interval = setInterval(fetchOrders, 5000);

        return () => clearInterval(interval);
    }, []);

    const statusSteps = [
        "WAITING",
        "PREPARING",
        "READY",
        "COMPLETED"
    ];

    const getStep = (status) => {
        return statusSteps.indexOf(status);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="container">
                    <h1 className="page-title">My Orders</h1>
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
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="empty">
                        <h2>No orders found</h2>
                    </div>
                ) : (
                    <div className="orders-list">

                        {orders.map((order) => {

                            const currentStep =
                                getStep(order.status);

                            return (
                                <div
                                    className="order-card"
                                    key={order._id}
                                >

                                    <div className="order-header">
                                        <div>
                                            <h2>
                                                Queue #{order.queueNumber}
                                            </h2>

                                            <p>
                                                Order ID:{" "}
                                                {order._id}
                                            </p>
                                        </div>

                                        <strong>
                                            {order.status}
                                        </strong>
                                    </div>

                                    <div className="order-items">
                                        {order.items.map(
                                            (item, index) => (
                                                <div
                                                    className="order-item"
                                                    key={index}
                                                >
                                                    <span>
                                                        {item.name} ×{" "}
                                                        {item.quantity}
                                                    </span>

                                                    <span>
                                                        ₹
                                                        {item.price *
                                                            item.quantity}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <h3>
                                        Total: ₹{order.totalAmount}
                                    </h3>

                                    <div className="order-progress">

                                        {statusSteps.map(
                                            (step, index) => (

                                                <div
                                                    className={
                                                        index <= currentStep
                                                            ? "progress-step active"
                                                            : "progress-step"
                                                    }
                                                    key={step}
                                                >

                                                    <div className="progress-circle">
                                                        {index + 1}
                                                    </div>

                                                    <span>
                                                        {step}
                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>

                                    {order.status === "READY" && (
                                        <div className="ready-message">
                                            🎉 Your order is ready!
                                            Please collect it from
                                            the canteen.
                                        </div>
                                    )}

                                    {order.status === "COMPLETED" && (
                                        <div className="completed-message">
                                            ✅ Order completed
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>
                )}

            </main>
        </>
    );
}

export default Orders;