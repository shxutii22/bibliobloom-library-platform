package com.readingcompanion.reading_companion_backend.controller;
import com.readingcompanion.reading_companion_backend.model.TbrItem;
import com.readingcompanion.reading_companion_backend.repository.TbrRepository;
import org.springframework.web.bind.annotation.*;
import com.readingcompanion.reading_companion_backend.service.TbrService;

import java.util.List;

@RestController
@RequestMapping("/tbr")
@CrossOrigin(origins = "http://localhost:5173")
public class TbrController {

    private final TbrService service;

    public TbrController(TbrService service) {
        this.service = service;
    }

    @GetMapping
    public List<TbrItem> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TbrItem add(@RequestBody TbrItem item) {
        return service.add(item);
    }

    @PutMapping("/{id}")
    public TbrItem toggle(@PathVariable Long id) {
        return service.toggle(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

