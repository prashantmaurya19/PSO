package com.PlayChess.com.ViewService.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    // Map '/' to index.html
    registry.addViewController("/").setViewName("forward:/index.html");

    // Map all non-API paths (paths that do not contain a period) to index.html
    // This is the key part for SPA routing.
    // It ensures that paths like /users, /products, /settings/profile
    // are forwarded to the index.html file, while allowing static assets (like .js, .css)
    // and your API endpoints (e.g., /api/users) to be served normally.
    registry
        .addViewController("/{path:[^\\.]*}") // Matches paths without a file extension
        .setViewName("forward:/index.html");

    // Optional: Match multi-level paths as well, excluding paths that start with 'api'
    // This pattern can get complex, but using a catch-all for paths without a period
    // as above is usually sufficient for most SPAs.
    // registry.addViewController("/{path:^(?!api$).*}/**")
    //         .setViewName("forward:/index.html");
  }
}
