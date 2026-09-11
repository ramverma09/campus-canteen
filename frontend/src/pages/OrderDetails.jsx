import Navbar from "../components/Navbar";
import OrderStatus from "../components/OrderStatus";

function OrderDetails() {

  const order =
    JSON.parse(localStorage.getItem("latestOrder"));

  if (!order) {

    return (
      <>
        <Navbar />

        <main className="container">

          <div className="empty">
            <h2>Order not found</h2>
          </div>

        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          Order Details
        </h1>

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

          <h3>Items</h3>

          <br />

          {order.items.map((item, index) => (

            <p key={index}>
              {item.name} — ₹{item.price}
            </p>

          ))}

          <br />

          <h3>
            Total: ₹{order.totalAmount}
          </h3>

          <br />

          <OrderStatus
            status={order.status}
          />

        </div>

      </main>
    </>
  );
}

export default OrderDetails;