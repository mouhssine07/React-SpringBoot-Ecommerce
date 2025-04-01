import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white mt-16 pt-12 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">About GreenShop</h3>
                        <p className="text-gray-600 mb-4">
                            We offer high-quality products at affordable prices. Our mission is to provide
                            an excellent shopping experience for all our customers.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-600">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-600">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-600">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-600 hover:text-green-600">Cart</Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-green-600">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/category/Electronics" className="text-gray-600 hover:text-green-600">Electronics</Link>
                            </li>
                            <li>
                                <Link to="/category/Accessories" className="text-gray-600 hover:text-green-600">Accessories</Link>
                            </li>
                            <li>
                                <Link to="/category/Wearables" className="text-gray-600 hover:text-green-600">Wearables</Link>
                            </li>
                            <li>
                                <Link to="/category/Audio" className="text-gray-600 hover:text-green-600">Audio</Link>
                            </li>
                            <li>
                                <Link to="/category/Storage" className="text-gray-600 hover:text-green-600">Storage</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-gray-400 mr-2 mt-1" />
                                <span className="text-gray-600">123 eShop St, Tech City, 10001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-gray-400 mr-2" />
                                <span className="text-gray-600">(123) 456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-gray-400 mr-2" />
                                <span className="text-gray-600">support@GreenShop.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-12 pt-6 pb-6">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} GreenShop. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;