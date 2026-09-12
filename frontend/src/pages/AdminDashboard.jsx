import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function AdminDashboard() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/orders/admin/all");
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

    const waiting = orders.filter(
        order => order.status === "WAITING"
    ).length;

    const preparing = orders.filter(
        order => order.status === "PREPARING"
    ).length;

    const ready = orders.filter(
        order => order.status === "READY"
    ).length;

    const completed = orders.filter(
        order => order.status === "COMPLETED"
    ).length;

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="container">
                    <h1 className="page-title">
                        Admin Dashboard
                    </h1>
                    <p>Loading dashboard...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container">

                <h1 className="page-title">
                    Admin Dashboard
                </h1>

                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <h2>{orders.length}</h2>
                        <p>Total Orders</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>{waiting}</h2>
                        <p>Waiting</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>{preparing}</h2>
                        <p>Preparing</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>{ready}</h2>
                        <p>Ready</p>
                    </div>

                    <div className="dashboard-card">
                        <h2>{completed}</h2>
                        <p>Completed</p>
                    </div>

                </div>

                <br />

                <h2>Recent Orders</h2>

                <div className="cart-items">

                    {orders.slice(0, 5).map(order => (

                        <div
                            className="cart-item"
                            key={order._id}
                        >

                            <div>
                                <h3>
                                    Queue #{order.queueNumber}
                                </h3>

                                <p>
                                    {order.userId?.name || "Unknown Student"}
                                </p>

                                <p>
                                    ₹{order.totalAmount}
                                </p>
                            </div>

                            <strong>
                                {order.status}
                            </strong>

                        </div>

                    ))}

                </div>

            </main>
        </>
    );
}

export default AdminDashboard;