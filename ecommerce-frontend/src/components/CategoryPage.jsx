import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { ArrowLeft } from 'lucide-react';

function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/products/category/${category}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products in this category');
                setLoading(false);
            });
    }, [category]);

    if (loading) return <div className="mt-24 text-center">Loading...</div>;
    if (error) return <div className="mt-24 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="flex items-center mb-6">
                <Link to="/" className="text-green-600 hover:underline flex items-center mr-4">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">{category}</h1>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No products found in this category.</p>
                    <Link to="/" className="text-green-600 hover:underline">
                        Return to homepage
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;