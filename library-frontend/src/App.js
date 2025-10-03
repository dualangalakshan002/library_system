import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Import the new component
import BookList from './components/BookList';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Add register route */}
          <Route
            path="/books"
            element={token ? <BookList /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={token ? "/books" : "/login"} />}  // Redirect based on token
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;