import Navbar from "../components/Navbar";

function AdminDashboard() {

  const order =
    JSON.parse(localStorage.getItem("latestOrder"));

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          Canteen Dashboard
        </h1>

        {!order ? (

          <div className="empty">
            <h2>No incoming orders</h2>
          </div>

        ) : (

          <div className="order-card">

            <h2>
              Order #{order.id}
            </h2>

            <br />

            <p>
              Queue Number:
              <strong>
                {" "}{order.queueNumber}
              </strong>
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

            <p>
              Total:
              <strong>
                {" "}₹{order.totalAmount}
              </strong>
            </p>

            <br />

            <p>
              Current Status:
              <strong>
                {" "}{order.status}
              </strong>
            </p>

            <br />

            <div className="admin-actions">

              <button
                className="btn"
                onClick={() => {
                  order.status = "PREPARING";

                  localStorage.setItem(
                    "latestOrder",
                    JSON.stringify(order)
                  );

                  window.location.reload();
                }}
              >
                Preparing
              </button>

              <button
                className="btn"
                onClick={() => {
                  order.status = "READY";

                  localStorage.setItem(
                    "latestOrder",
                    JSON.stringify(order)
                  );

                  window.location.reload();
                }}
              >
                Ready
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  order.status = "COMPLETED";

                  localStorage.setItem(
                    "latestOrder",
                    JSON.stringify(order)
                  );

                  window.location.reload();
                }}
              >
                Completed
              </button>

            </div>

          </div>

        )}

      </main>
    </>
  );
}

export default AdminDashboard;