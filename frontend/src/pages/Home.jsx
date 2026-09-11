import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="container">

        <section className="hero">

          <div className="hero-content">

            <h1>
              Skip the Queue,
              <br />
              Enjoy Your Food 🍔
            </h1>

            <p>
              Order your favorite food from the campus
              canteen, receive your queue number and
              track your order status.
            </p>

            <Link to="/menu" className="btn">
              Order Now
            </Link>

          </div>

          <div className="hero-icon">
            🍔
          </div>

        </section>

      </main>
    </>
  );
}

export default Home;