package com.example.ecommercebackend.service;

import com.example.ecommercebackend.model.Product;
import com.example.ecommercebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Initialize with sample data if repository is empty
    public void initializeProducts() {
        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                    new Product(null, "Laptop", 999.99, "A high-performance laptop with 16GB RAM and 512GB SSD", "/images/laptop-black-screen.jpg", 15, "Electronics"),
                    new Product(null, "Smartphone", 499.99, "A sleek smartphone with 128GB storage", "https://via.placeholder.com/300", 20, "Electronics"),
                    new Product(null, "Headphones", 79.99, "Noise-cancelling over-ear headphones", "https://via.placeholder.com/300", 30, "Accessories"),
                    new Product(null, "Smart Watch", 199.99, "Fitness tracking smartwatch with heart rate monitor", "https://via.placeholder.com/300", 12, "Wearables"),
                    new Product(null, "Bluetooth Speaker", 59.99, "Portable wireless speaker with 10-hour battery life", "https://via.placeholder.com/300", 25, "Audio"),
                    new Product(null, "Wireless Mouse", 29.99, "Ergonomic wireless mouse with adjustable DPI", "https://via.placeholder.com/300", 40, "Accessories"),
                    new Product(null, "External SSD", 89.99, "500GB portable SSD with USB-C connection", "https://via.placeholder.com/300", 18, "Storage"),
                    new Product(null, "Gaming Keyboard", 69.99, "Mechanical gaming keyboard with RGB lighting", "https://via.placeholder.com/300", 15, "Gaming")
            ));
        }
    }
}