import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const {
        cart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
    } = useCart();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cart.length === 0 ? (
                <p>Cart is empty 😢</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-white p-4 mb-3 rounded-xl shadow"
                        >
                            <div>
                                <h2 className="font-semibold">
                                    {item.product_name}
                                </h2>
                                <p>₹{item.price}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => decreaseQty(item.id)}>
                                    -
                                </button>
                                <span>{item.qty}</span>
                                <button onClick={() => increaseQty(item.id)}>
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="mt-6 text-xl font-bold">
                        Total: ₹{totalPrice}
                    </div>
                </>
            )}
        </div>
    );
}