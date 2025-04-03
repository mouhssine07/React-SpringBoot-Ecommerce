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

    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
    };

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
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-xl mb-10 ">
                <div className="flex flex-col md:flex-row text-center items-center p-8 md:p-15 gap-y-8 md:gap-y-0 md:gap-x-8">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Spring Sale: Up to 50% Off
                        </h1>
                        <p className="text-green-100 mb-6">
                            Discover our latest collection of electronics and accessories at unbeatable prices.
                        </p>

                        <a
                            className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                const section = document.getElementById("featured-products");
                                section?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
                            }}
                        >
                            Shop Now
                        </a>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Ftest1-emgndhaqd0c9h2db.a01.azurefd.net%2Fimages%2F2843bde0-471a-4396-81f7-6fc6907a15c6.png"
                            alt="Featured Products"
                            className="rounded-lg shadow-lg w-100 h-auto object-contain md:w-auto md:h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section
                id={'featured-products'}
                className="mb-12">
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