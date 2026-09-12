import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import API from "../api";

function Menu() {

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/menu");
        setFoodItems(response.data);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          Today's Menu
        </h1>

        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="menu-grid">
            {foodItems.map((item) => (
              <FoodCard
                key={item._id || item.id}
                item={item}
              />
            ))}
          </div>
        )}

      </main>
    </>
  );
}

export default Menu;