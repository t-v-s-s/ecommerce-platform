export default function Checkout() {
    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Checkout</h1>

            <input placeholder="Name" className="border p-2 w-full mb-2" />
            <input placeholder="Address" className="border p-2 w-full mb-2" />
            <input placeholder="Card Number" className="border p-2 w-full mb-2" />

            <button className="w-full bg-green-500 text-white p-2 rounded">
                Place Order
            </button>
        </div>
    );
}