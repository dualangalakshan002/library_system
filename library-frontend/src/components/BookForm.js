import React, { useState, useEffect } from 'react';

const BookForm = ({ book, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        publicationYear: ''
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                    <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
                    <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" />
                    <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
                    <input name="publicationYear" type="number" value={formData.publicationYear} onChange={handleChange} placeholder="Publication Year" />
                    <div className="modal-actions">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;