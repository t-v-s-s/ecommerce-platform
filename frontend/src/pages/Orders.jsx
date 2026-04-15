import { useEffect, useState } from "react";

const mockOrders = [
    {
        id: 1,
        total: 1200,
        status: "Delivered",
        date: "12 Apr 2026",
        step: 3,
        items: [
            { name: "Nike Shoes", img: "https://via.placeholder.com/60" },
            { name: "Watch", img: "https://via.placeholder.com/60" },
        ],
    },
    {
        id: 2,
        total: 800,
        status: "Shipped",
        date: "10 Apr 2026",
        step: 2,
        items: [
            { name: "T-Shirt", img: "https://via.placeholder.com/60" },
        ],
    },
];

const steps = ["Placed", "Packed", "Shipped", "Delivered"];

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setTimeout(() => {
            setOrders(mockOrders);
            setLoading(false);
        }, 800);
    }, []);

    const filtered = orders.filter((o) => {
        const matchSearch = o.id.toString().includes(search);
        const matchFilter = filter === "All" || o.status === filter;
        return matchSearch && matchFilter;
    });

    const downloadInvoice = (id) => {
        alert(`Downloading invoice for order #${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">My Orders</h1>

                {/* Search + Filter */}
                <div className="flex gap-3 mt-4">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search order ID..."
                        className="w-full px-4 py-2 border rounded-xl bg-white"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border rounded-xl bg-white"
                    >
                        <option>All</option>
                        <option>Placed</option>
                        <option>Packed</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                    </select>
                </div>
            </div>

            {/* Orders */}
            <div className="max-w-4xl mx-auto mt-6 space-y-4">
                {loading ? (
                    Array(2).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl animate-pulse">
                            <div className="h-4 bg-gray-200 w-1/3 mb-3 rounded" />
                            <div className="h-4 bg-gray-200 w-1/2 rounded" />
                        </div>
                    ))
                ) : filtered.length === 0 ? (
                    <div className="bg-white p-6 rounded-xl text-center text-gray-500">
                        No orders found
                    </div>
                ) : (
                    filtered.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    <p className="font-semibold">{order.date}</p>
                                </div>

                                <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                    {order.status}
                                </span>
                            </div>

                            {/* items */}
                            <div className="flex gap-2 mt-4">
                                {order.items.map((item, i) => (
                                    <img
                                        key={i}
                                        src={item.img}
                                        className="w-12 h-12 rounded-lg border"
                                    />
                                ))}
                            </div>

                            {/* timeline */}
                            <div className="flex mt-5 text-xs">
                                {steps.map((s, i) => (
                                    <div key={i} className="flex-1 text-center">
                                        <div
                                            className={`h-1 rounded ${i < order.step ? "bg-blue-500" : "bg-gray-200"
                                                }`}
                                        />
                                        <p className="mt-1 text-gray-500">{s}</p>
                                    </div>
                                ))}
                            </div>

                            {/* actions */}
                            <div className="flex justify-between mt-5">
                                <p className="font-bold">₹{order.total}</p>

                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-blue-600 font-medium"
                                >
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* DRAWER */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
                    <div className="w-full max-w-md bg-white h-full p-5 overflow-y-auto">

                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                Order #{selectedOrder.id}
                            </h2>
                            <button onClick={() => setSelectedOrder(null)}>✕</button>
                        </div>

                        <p className="text-gray-500">{selectedOrder.status}</p>

                        {/* tracking */}
                        <div className="mt-5">
                            <h3 className="font-semibold mb-2">Tracking</h3>

                            <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                                Live Map (Google Maps)
                            </div>
                        </div>

                        {/* invoice */}
                        <button
                            onClick={() => downloadInvoice(selectedOrder.id)}
                            className="w-full mt-4 border py-2 rounded-xl"
                        >
                            Download Invoice
                        </button>

                        {/* whatsapp */}
                        <button className="w-full mt-3 bg-green-500 text-white py-2 rounded-xl">
                            WhatsApp Updates
                        </button>

                        {/* actions */}
                        <div className="flex gap-3 mt-5">
                            {selectedOrder.status === "Delivered" ? (
                                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl">
                                    Return
                                </button>
                            ) : (
                                <button className="flex-1 bg-gray-100 py-2 rounded-xl">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}