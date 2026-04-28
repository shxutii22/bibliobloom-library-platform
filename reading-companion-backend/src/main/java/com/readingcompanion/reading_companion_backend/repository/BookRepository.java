package com.readingcompanion.reading_companion_backend.repository;

import com.readingcompanion.reading_companion_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book,Long> {
}
