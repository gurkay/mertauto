package com.template.backend.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allowed origins
        List<String> allowedOrigins = new ArrayList<>();
        allowedOrigins.add("https://mertautogarage.com");
        allowedOrigins.add("https://www.mertautogarage.com");
        allowedOrigins.add("http://mertautogarage.com");
        allowedOrigins.add("http://www.mertautogarage.com");
        allowedOrigins.add("http://localhost:3000");
        allowedOrigins.add("http://localhost:8080");
        allowedOrigins.add("https://localhost:8080");
        allowedOrigins.add("http://localhost:80");
        configuration.setAllowedOrigins(allowedOrigins);
        
        // Allowed methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allowed headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "X-Requested-With",
            "Accept",
            "Origin",
            "Cache-Control",
            "X-Forwarded-For",
            "X-Real-IP"
        ));
        
        // Exposed headers (frontend'in görebileceği header'lar)
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Total-Count"
        ));
        
        // Allow credentials
        configuration.setAllowCredentials(true);
        
        // Max age
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
