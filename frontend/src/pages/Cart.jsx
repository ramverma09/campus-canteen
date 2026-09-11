import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const removeItem = (index) => {

    const updatedCart =
      cart.filter((_, i) => i !== index);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  const placeOrder = () => {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {

      id: "CC" + Date.now(),

      queueNumber:
        Math.floor(Math.random() * 90) + 10,

      items: cart,

      totalAmount: total,

      status: "WAITING",

      createdAt:
        new Date().toISOString()

    };

    localStorage.setItem(
      "latestOrder",
      JSON.stringify(order)
    );

    localStorage.removeItem("cart");

    alert(
      `Order placed!\nQueue Number: ${order.queueNumber}`
    );

    navigate(`/order/${order.id}`);

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
            <table className="cart-table">

              <thead>

                <tr>
                  <th>Food</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {cart.map((item, index) => (

                  <tr key={index}>

                    <td>
                      {item.name}
                    </td>

                    <td>
                      ₹{item.price}
                    </td>

                    <td>

                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          removeItem(index)
                        }
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <br />

            <h2>
              Total: ₹{total}
            </h2>

            <br />

            <button
              className="btn"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </>

        )}

      </main>
    </>
  );
}

export default Cart;