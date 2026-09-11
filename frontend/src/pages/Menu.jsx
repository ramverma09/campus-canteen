import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

function Menu() {

  const foodItems = [
    {
      id: 1,
      name: "Veg Burger",
      description: "Fresh vegetable burger",
      price: 60,
      emoji: "🍔"
    },
    {
      id: 2,
      name: "Pizza",
      description: "Cheesy campus pizza",
      price: 80,
      emoji: "🍕"
    },
    {
      id: 3,
      name: "French Fries",
      description: "Crispy golden fries",
      price: 40,
      emoji: "🍟"
    },
    {
      id: 4,
      name: "Sandwich",
      description: "Fresh vegetable sandwich",
      price: 50,
      emoji: "🥪"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="container">

        <h1 className="page-title">
          Today's Menu
        </h1>

        <div className="menu-grid">

          {foodItems.map((item) => (

            <FoodCard
              key={item.id}
              item={item}
            />

          ))}

        </div>

      </main>
    </>
  );
}

export default Menu;