import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                const allProducts = response.data;
                setProducts(allProducts);

                // Set featured products (first 4 items)
                setFeaturedProducts(allProducts.slice(0, 4));

                // Extract unique categories
                const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
                setCategories(uniqueCategories);

                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="mt-24 text-center">Loading...</div>;
    if (error) return <div className="mt-24 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-xl mb-10">
                <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Spring Sale: Up to 50% Off
                        </h1>
                        <p className="text-green-100 mb-6">
                            Discover our latest collection of electronics and accessories at unbeatable prices.
                        </p>
                        <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                            Shop Now
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="static/images/laptop-black-screen.jpg"
                            alt="Featured Products"
                            className="rounded-lg shadow-lg max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                    <Link to="/products" className="text-green-600 hover:underline">
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/category/${category}`}
                            className="bg-green-600 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-white transition"
                        >
                            <div className="p-6 flex flex-col items-center">
                                <span className="text-xl font-medium text-gray-800 text-center">{category}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* All Products */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;