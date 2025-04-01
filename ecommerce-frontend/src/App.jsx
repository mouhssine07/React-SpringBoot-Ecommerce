import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CategoryPage from './components/CategoryPage';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Check if the product is already in the cart
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Update quantity if product is already in cart
                const updatedItems = [...prevItems];
                const newQuantity = updatedItems[existingItemIndex].quantity + product.quantity;

                // Make sure the new quantity doesn't exceed stock
                updatedItems[existingItemIndex].quantity = Math.min(newQuantity, product.stock);
                return updatedItems;
            } else {
                // Add new product to cart
                return [...prevItems, product];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.min(newQuantity, item.stock) }
                    : item
            )
        );
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Navbar cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetail addToCart={addToCart} />}
                        />
                        <Route
                            path="/cart"
                            element={
                                <Cart
                                    cartItems={cartItems}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            }
                        />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;