package com.readingcompanion.reading_companion_backend.service;


import com.readingcompanion.reading_companion_backend.model.Book;
import com.readingcompanion.reading_companion_backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Save book
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id " + id);
        }
        bookRepository.deleteById(id);
    }
    public Book updateBook(Long id, Book updatedBook) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    existingBook.setTitle(updatedBook.getTitle());
                    existingBook.setAuthor(updatedBook.getAuthor());
                    existingBook.setCost(updatedBook.getCost());
                    existingBook.setStartDate(updatedBook.getStartDate());
                    existingBook.setEndDate(updatedBook.getEndDate());
                    existingBook.setTotalPages(updatedBook.getTotalPages());
                    existingBook.setBinding(updatedBook.getBinding());
                    existingBook.setRating(updatedBook.getRating());
                    existingBook.setReview(updatedBook.getReview());
                    existingBook.setRecommend(updatedBook.isRecommend());

                    return bookRepository.save(existingBook);
                })
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }

}

