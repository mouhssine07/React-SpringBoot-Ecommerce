import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

function ProductDetail({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (product && addToCart) {
            addToCart({
                ...product,
                quantity
            });
        }
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) return <div className="mt-24 text-center">Loading...</div>;
    if (error) return <div className="mt-24 text-center text-red-500">{error}</div>;
    if (!product) return <div className="mt-24 text-center">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-green-600 mb-6 hover:underline"
            >
                <ArrowLeft size={16} className="mr-1" /> Back to products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                        src={product.imageUrl || "https://via.placeholder.com/500"}
                        alt={product.name}
                        className="w-full h-auto object-contain rounded-md"
                    />
                </div>

                {/* Product Details */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <div className="mb-4">
            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</div>

                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="mb-6">
                        <p className={`${product.stock > 5 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                        <span className="mr-3 text-gray-700">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                                className="px-3 py-1 border-r focus:outline-none disabled:opacity-50"
                            >
                                -
                            </button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button
                                onClick={incrementQuantity}
                                disabled={product.stock <= quantity}
                                className="px-3 py-1 border-l focus:outline-none disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-auto">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600"
                        >
                            <ShoppingCart size={20} className="mr-2" />
                            Add to Cart
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <Heart size={20} className="mr-2" />
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;