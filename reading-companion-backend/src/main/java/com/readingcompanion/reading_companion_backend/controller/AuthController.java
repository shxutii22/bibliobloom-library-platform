package com.readingcompanion.reading_companion_backend.controller;

import com.readingcompanion.reading_companion_backend.dto.AuthResponse;
import com.readingcompanion.reading_companion_backend.dto.LoginRequest;
import com.readingcompanion.reading_companion_backend.dto.RegisterRequest;
import com.readingcompanion.reading_companion_backend.model.User;
import com.readingcompanion.reading_companion_backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request) {

        String token = authService.register(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {

        String token = authService.login(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}


