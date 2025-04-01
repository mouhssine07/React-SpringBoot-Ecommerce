import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { ArrowLeft, Search } from 'lucide-react';

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setProducts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        axios.get(`http://localhost:8080/api/products/search?keyword=${encodeURIComponent(query)}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error searching products:', err);
                setError('Failed to search products');
                setLoading(false);
            });
    }, [query]);

    if (loading) return <div className="mt-24 text-center">Loading...</div>;
    if (error) return <div className="mt-24 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="flex items-center mb-6">
                <Link to="/" className="text-green-600 hover:underline flex items-center mr-4">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">
                    Search Results for "{query}"
                </h1>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                    <p className="text-gray-500 mb-4">
                        We couldn't find any products matching "{query}".
                    </p>
                    <p className="text-gray-500 mb-6">Try checking your spelling or using more general terms.</p>
                    <Link
                        to="/"
                        className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                    >
                        Return to homepage
                    </Link>
                </div>
            ) : (
                <>
                    <p className="mb-6 text-gray-600">Found {products.length} products matching your search.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchResults;