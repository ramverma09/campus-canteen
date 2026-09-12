import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          My Orders
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty">

            <h2>
              No orders found
            </h2>

            <br />

            <Link
              to="/menu"
              className="btn"
            >
              Order Food
            </Link>

          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>

              <h2>
                Order #{order._id}
              </h2>

              <div className="queue-number">
                {order.queueNumber}
              </div>

              <p>
                Queue Number
              </p>

              <br />

              <span
                className={`status status-${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>

              <br />
              <br />

              <Link
                to={`/order/${order._id}`}
                className="btn"
              >
                View Details
              </Link>

            </div>
          ))
        )}

      </main>
    </>
  );
}

export default Orders;