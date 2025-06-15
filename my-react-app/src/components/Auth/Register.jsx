import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('guest');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {
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
            const result = await register({
                username,
                email,
                password,
                user_type: userType
            });

            if (result.success) {
                toast.success('Registration successful!', {
                    style: {
                        background: '#efeee4',
                        color: '#4f7e52',
                        borderRadius: '8px',
                        border: '2px solid #4f7e52'
                    }
                });
                navigate('/login');
            } else {
                toast.error(result.error || 'Registration failed', {
                    style: {
                        background: '#efeee4',
                        color: '#4f7e52',
                        borderRadius: '8px',
                        border: '2px solid #4f7e52'
                    }
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('An error occurred during registration', {
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
            <div className="auth-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            className="form-input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <div className="select-wrapper">
                            <select
                                name="user_type"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                                className="custom-select"
                            >
                                <option value="guest" disabled>Select Account Type</option>
                                <option value="user">Regular User</option>
                                <option value="host">Host</option>
                            </select>
                            <div className="select-arrow"></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;