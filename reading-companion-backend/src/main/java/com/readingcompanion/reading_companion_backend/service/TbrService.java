package com.readingcompanion.reading_companion_backend.service;

import com.readingcompanion.reading_companion_backend.model.TbrItem;
import com.readingcompanion.reading_companion_backend.repository.TbrRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbrService {

    private final TbrRepository repo;

    public TbrService(TbrRepository repo) {
        this.repo = repo;
    }

    // 🔹 Get all TBR items
    public List<TbrItem> getAll() {
        return repo.findAll();
    }

    // 🔹 Add new TBR item
    public TbrItem add(TbrItem item) {
        item.setCompleted(false); // safety default
        return repo.save(item);
    }

    // 🔹 Toggle completed status
    public TbrItem toggle(Long id) {
        TbrItem item = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("TBR item not found"));

        item.setCompleted(!item.isCompleted());
        return repo.save(item);
    }

    // 🔹 Delete item
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
