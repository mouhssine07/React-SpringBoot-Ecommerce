import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

function Cart({ cartItems = [], updateQuantity, removeFromCart }) {
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateTax = () => {
        return (calculateSubtotal() * 0.08).toFixed(2);
    };

    const calculateTotal = () => {
        return (parseFloat(calculateSubtotal()) + parseFloat(calculateTax())).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 mt-10 flex flex-col items-center justify-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link
                    to="/"
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 bg-gray-50 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">Your Items</h2>
                                <Link
                                    to="/"
                                    className="text-green-600 flex items-center hover:underline"
                                >
                                    <ArrowLeft size={16} className="mr-1" /> Continue Shopping
                                </Link>
                            </div>
                        </div>

                        <div className="divide-y">
                            {cartItems.map((item) => (
                                <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                                    <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                                        <img
                                            src={item.imageUrl || "https://via.placeholder.com/150"}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1 sm:ml-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="px-3 py-1 border-r focus:outline-none disabled:opacity-50"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.stock <= item.quantity}
                                                    className="px-3 py-1 border-l focus:outline-none disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-lg font-medium text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${calculateSubtotal()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (8%)</span>
                                <span>${calculateTax()}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${calculateTotal()}</span>
                            </div>
                        </div>

                        <button className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700">
                            Proceed to Checkout
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Free shipping on all orders over $50</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;