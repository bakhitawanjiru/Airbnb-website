import React, { useState } from 'react';
import { useAuth } from '/src/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            toast.error('Please fill in all fields', {
                style: {
                    background: '#efeee4',
                    color: '#4f7e52',
                    borderRadius: '8px',
                    border: '2px solid #4f7e52'
                }
            });
            return;
        }

        try {
            const result = await login({
                email: email.toLowerCase().trim(),
                password: password
            });

            if (result.success) {
                toast.success('Login successful!', {
                    style: {
                        background: '#efeee4',
                        color: '#4f7e52',
                        borderRadius: '8px',
                        border: '2px solid #4f7e52'
                    }
                });

                // Redirect based on user type
                if (result.isAdmin) {
                    navigate('/admin-dashboard');
                } else if (result.userType === 'host') {
                    navigate('/host-dashboard');
                } else {
                    navigate('/dashboard'); // This will redirect to your original dashboard
                }
            } else {
                toast.error(result.error || 'Login failed', {
                    style: {
                        background: '#efeee4',
                        color: '#4f7e52',
                        borderRadius: '8px',
                        border: '2px solid #4f7e52'
                    }
                });
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.response?.data?.detail || 'An error occurred during login', {
                style: {
                    background: '#efeee4',
                    color: '#4f7e52',
                    borderRadius: '8px',
                    border: '2px solid #4f7e52'
                }
            });
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Log In
                </button>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;