import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("API error", err);
            });
    }, []);

    // filter inside component
    const filteredProducts = products.filter((p) =>
        p.product_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* Search Input */}
            <div className="p-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/*  Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found 😢
                    </p>
                )}
            </div>
        </>
    );
}