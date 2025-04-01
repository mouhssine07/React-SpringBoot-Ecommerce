package com.example.ecommercebackend.config;

import com.example.ecommercebackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final ProductService productService;

    @Autowired
    public DatabaseInitializer(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public void run(String... args) {
        // Initialize sample products
        productService.initializeProducts();
    }
}