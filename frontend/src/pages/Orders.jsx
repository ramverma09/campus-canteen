import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Orders() {

  const order =
    JSON.parse(localStorage.getItem("latestOrder"));

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          My Orders
        </h1>

        {!order ? (

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

          <div className="order-card">

            <h2>
              Order #{order.id}
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
              to={`/order/${order.id}`}
              className="btn"
            >
              View Details
            </Link>

          </div>

        )}

      </main>
    </>
  );
}

export default Orders;