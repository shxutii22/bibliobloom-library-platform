package com.readingcompanion.reading_companion_backend.repository;

import com.readingcompanion.reading_companion_backend.model.TbrItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TbrRepository extends JpaRepository<TbrItem, Long> {
}
