function FoodCard({ item }) {

  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(item);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert(`${item.name} added to cart!`);

  };

  return (
    <div className="food-card">

      <div className="food-image">
        {item.emoji}
      </div>

      <div className="food-content">

        <h3>
          {item.name}
        </h3>

        <p>
          {item.description}
        </p>

        <div className="price">
          ₹{item.price}
        </div>

        <button
          className="btn"
          onClick={addToCart}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default FoodCard;