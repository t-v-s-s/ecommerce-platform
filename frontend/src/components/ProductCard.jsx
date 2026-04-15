import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const [added, setAdded] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const rating = Math.floor(Math.random() * 2) + 4;

    // Load wishlist
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(saved.includes(product.id));
    }, [product.id]);

    // Toggle wishlist
    const toggleWishlist = () => {
        let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (saved.includes(product.id)) {
            saved = saved.filter((id) => id !== product.id);
            setWishlist(false);
        } else {
            saved.push(product.id);
            setWishlist(true);
        }

        localStorage.setItem("wishlist", JSON.stringify(saved));
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition relative">

                {/* Wishlist */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                >
                    {wishlist ? "❤️" : "🤍"}
                </button>

                {/* Image */}
                <div className="overflow-hidden">
                    <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        alt={product.product_name}
                        className="h-48 w-full object-cover group-hover:scale-110 transition"
                    />
                </div>

                <div className="p-4">

                    <h2 className="font-semibold truncate">
                        {product.product_name}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-2">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="text-yellow-400 text-sm">
                        {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                    </div>

                    {/* Price + Add */}
                    <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-blue-600">
                            ₹{product.price}
                        </span>

                        <button
                            onClick={() => {
                                addToCart(product);
                                setAdded(true);
                                setTimeout(() => setAdded(false), 1000);
                            }}
                            className={`px-3 py-1 rounded text-white transition ${added ? "bg-green-500" : "bg-blue-500"
                                }`}
                        >
                            {added ? "Added ✔" : "Add"}
                        </button>
                    </div>

                    {/* Quick View */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-blue-500 mt-2 hover:underline"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-5 rounded-2xl w-[90%] max-w-md"
                    >
                        <h2 className="text-xl font-bold">
                            {product.product_name}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {product.description}
                        </p>

                        <p className="mt-3 font-bold text-blue-600">
                            ₹{product.price}
                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 text-red-500"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}