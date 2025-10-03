import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/login', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/books'; // Force a refresh to update App's token check
            })
            .catch(error => console.error('Login failed!', error));
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: 'white', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="login-button">Login</button>

            </form>
            {/* Add link to register page */}
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;