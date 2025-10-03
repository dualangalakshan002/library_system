import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/register', { email, password })
            .then(response => {
                setMessage('Registration successful! Please login.');
                // Redirect to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(error => {
                setMessage(error.response.data || 'Registration failed!');
                console.error('Registration failed!', error);
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: 'white', borderRadius: '8px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;