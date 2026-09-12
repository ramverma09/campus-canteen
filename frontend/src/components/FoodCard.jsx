function FoodCard({ item }) {

    const itemId = item._id || item.id;

    const addToCart = () => {

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const existingItem = cart.find(
            (cartItem) =>
                (cartItem._id || cartItem.id) === itemId
        );

        let updatedCart;

        if (existingItem) {

            updatedCart = cart.map((cartItem) => {

                const cartItemId = cartItem._id || cartItem.id;

                if (cartItemId === itemId) {

                    return {
                        ...cartItem,
                        quantity:
                            (cartItem.quantity || 1) + 1
                    };
                }

                return cartItem;
            });

        } else {

            updatedCart = [
                ...cart,
                {
                    ...item,
                    _id: itemId,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        alert(`${item.name} added to cart!`);
    };

    return (
        <div className="food-card">

            <h3>{item.name}</h3>

            <p>{item.category}</p>

            <h4>₹{item.price}</h4>

            <button
                className="btn"
                onClick={addToCart}
            >
                Add to Cart
            </button>

        </div>
    );
}

export default FoodCard;