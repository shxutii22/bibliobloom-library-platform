package com.readingcompanion.reading_companion_backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;

}
