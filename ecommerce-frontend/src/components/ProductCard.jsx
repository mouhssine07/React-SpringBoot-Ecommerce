import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="product-card bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="mb-4 overflow-hidden rounded-md">
                <img
                    src={product.imageUrl || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            <p className="text-lg font-bold text-green-600 mb-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
          {product.category}
        </span>
                <span className={`text-sm ${product.stock > 5 ? 'text-green-600' : 'text-red-500'}`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
            </div>
        </div>
    );
}

export default ProductCard;