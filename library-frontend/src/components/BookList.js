import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import BookForm from './BookForm';
import Navbar from './Navbar';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        apiClient.get('/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching books:", error));
    };

    const handleSave = (book) => {
        const promise = book.id
            ? apiClient.put(`/books/${book.id}`, book)
            : apiClient.post('/books', book);

        promise.then(() => {
            fetchBooks();
            closeModal();
        }).catch(error => console.error("Error saving book:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            apiClient.delete(`/books/${id}`)
                .then(() => fetchBooks())
                .catch(error => console.error("Error deleting book:", error));
        }
    };

    const openModal = (book = null) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingBook(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <div className="book-list-container">
                <div className="book-list-header">
                    <h2>Your Book Collection</h2>
                    <button onClick={() => openModal()} className="add-button">+ Add Book</button>
                </div>
                <div className="book-grid">
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p>by {book.author}</p>
                            <p className="book-meta">ISBN: {book.isbn}</p>
                            <p className="book-meta">Genre: {book.genre}</p>
                            <p className="book-meta">Year: {book.publicationYear}</p>
                            <div className="card-actions">
                                <button onClick={() => openModal(book)}>Edit</button>
                                <button onClick={() => handleDelete(book.id)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && <BookForm book={editingBook} onSave={handleSave} onClose={closeModal} />}
            </div>
        </>
    );
};

export default BookList;