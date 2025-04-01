import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

function Navbar({ cartItemCount = 0 }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories] = useState([
        'All Products', 'Electronics', 'Accessories', 'Wearables', 'Audio', 'Storage', 'Gaming'
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-green-600 font-bold text-xl">GreenShop</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative mx-4 flex-1 max-w-md">
                            <form onSubmit={handleSubmit} className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 text-gray-400" size={18} />
                                <button
                                    type="submit"
                                    className="absolute right-2 bg-green-500 text-white p-1 rounded-md"
                                >
                                    <Search size={18} />
                                </button>
                            </form>
                        </div>

                        <div className="hidden md:flex space-x-4">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={index === 0 ? "/" : `/category/${category}`}
                                    className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>

                        <Link
                            to="/cart"
                            className="text-gray-600 hover:text-green-600 relative p-2"
                        >
                            <ShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Link
                            to="/cart"
                            className="text-gray-600 hover:text-green-600 relative p-2 mr-2"
                        >
                            <ShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-green-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white p-4 shadow-inner">
                    <form onSubmit={handleSubmit} className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-7 text-gray-400" size={18} />
                        <button
                            type="submit"
                            className="absolute right-6 bg-green-500 text-white p-1 rounded-md"
                        >
                            <Search size={18} />
                        </button>
                    </form>
                    <div className="flex flex-col space-y-2">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={index === 0 ? "/" : `/category/${category}`}
                                className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium block"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;